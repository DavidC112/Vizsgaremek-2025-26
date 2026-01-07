using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        private readonly HealthAppDbContext _context;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration config, HealthAppDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _context = context;
        }


        [HttpGet("test")]
        public async Task<IActionResult> Get()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var user = new User {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(result);
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized();
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized();

            var refreshToken = Guid.NewGuid().ToString();
            var refreshTokenHash = HashToken(refreshToken);


            var refreshTokenEntity = new RefreshToken
            {
                UserId = user.Id,
                TokenHash = refreshTokenHash,
                Expiry = DateTime.UtcNow.AddDays(7),
            };
            
            _context.RefreshTokens.Add(refreshTokenEntity);
            await _context.SaveChangesAsync();
            var token = GenerateJwtToken(user);


            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = refreshTokenEntity.Expiry
            });

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }



        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken(RefreshDto refreshDto)
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken)) return Unauthorized();

            var refreshTokenHash = HashToken(refreshToken);

            var storedToken = await _context.RefreshTokens.FirstOrDefaultAsync(rt => rt.TokenHash == refreshTokenHash);
            if (storedToken == null || storedToken.Expiry <= DateTime.UtcNow)
            {
                return Unauthorized();
            }
            var user = await _userManager.FindByIdAsync(storedToken.UserId);
            if (user == null) return Unauthorized();

            var newToken = GenerateJwtToken(user);

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(newToken) });
        }


        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (!string.IsNullOrEmpty(refreshToken))
            {
                var hash = HashToken(refreshToken);
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var tokenEntity = await _context.RefreshTokens.FirstOrDefaultAsync(rt => rt.TokenHash == hash && rt.UserId == userId);

                if (tokenEntity != null)
                {
                    _context.RefreshTokens.Remove(tokenEntity);
                    await _context.SaveChangesAsync();
                }
            }

            Response.Cookies.Delete("refreshToken");
            return Ok("logged out");
        }



        private JwtSecurityToken GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            return new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );
        }

        private static string HashToken(string token)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(token));
            return Convert.ToBase64String(bytes);
        }
        
    }
}
