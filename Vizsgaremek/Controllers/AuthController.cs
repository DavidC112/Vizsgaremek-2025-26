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

namespace Vizsgaremek.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        private readonly HealthAppDbContext _ctx;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration config, HealthAppDbContext ctx)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _ctx = ctx;
        }


        [HttpGet("test")]
        public async Task<IActionResult> Get() 
        {
            var users = await _ctx.Users.ToListAsync();
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
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7); 
            await _userManager.UpdateAsync(user);

            var token = GenerateJwtToken(user); 

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                refreshtoken = refreshToken
            });
        }


        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken(RefreshDto refreshDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshDto.RefreshToken);
            if (user == null || user.RefreshTokenExpiryTime <= DateTime.Now)
                return Unauthorized("Invalid or expired refresh token");
            var newToken = GenerateJwtToken(user); 

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(newToken)
            });
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

            return  new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );
        }
    }
}
