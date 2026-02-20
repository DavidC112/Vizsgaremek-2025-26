using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs;
using Vizsgaremek.Models;
using Vizsgaremek.Services;



namespace Vizsgaremek.Controllers.Public
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

       

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterDto registerDto)
        {
            var user = new User
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
                BirthDate = registerDto.BirthDate,
                Gender = registerDto.Gender,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            await _userManager.AddToRoleAsync(user, "User");

            return Created(
                "api/user/me",
                null
            );
        }




        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return Unauthorized("User was not found in auth/login");
            }


            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Invalid password in auth/login");
            }

            var refreshToken = Guid.NewGuid().ToString();
            var refreshTokenHash = TokenService.HashToken(refreshToken);


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
                SameSite = SameSiteMode.None,
                Expires = refreshTokenEntity.Expiry
            });

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(await token)
            });
        }


            
        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized("Token was not found in auth/refresh");
            }

            var refreshTokenHash = TokenService.HashToken(refreshToken);

            var storedToken = await _context.RefreshTokens.FirstOrDefaultAsync(rt => rt.TokenHash == refreshTokenHash);
            if (storedToken == null || storedToken.Expiry <= DateTime.UtcNow)
            {
                return Unauthorized();
            }
            var user = await _userManager.FindByIdAsync(storedToken.UserId);
            if (user == null)
            {
                return Unauthorized("User was not found in auth/refresh");
            }

            var newToken = GenerateJwtToken(user);

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(await newToken) });
        }


        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> LogoutUser()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (!string.IsNullOrEmpty(refreshToken))
            {
                var hash = TokenService.HashToken(refreshToken);
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


        private async Task<JwtSecurityToken> GenerateJwtToken([FromBody] User user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty)
            };

            claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            return new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );
        }
    }
}
