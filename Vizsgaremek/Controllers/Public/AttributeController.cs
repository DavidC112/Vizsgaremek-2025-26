using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers.Public
{
    [ApiController]
    [Route("api/users/me/attributes")]
    [Authorize]
    public class AttributeController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;
        public AttributeController(HealthAppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        [HttpGet]
        public async Task<IActionResult> GetLoggedUserAttributes()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in attributes/");
            }
            var attributes = await _context.UserAttributes
                .Where(ua => ua.UserId == user.Id)
                .Select(ua => new AttributesResponseDto
                {
                    Id = ua.Id,
                    Weight = ua.Weight,
                    Height = ua.Height,
                    MeasuredAt = ua.MeasuredAt,
                    Bmi = ua.Bmi,
                    Bmr = ua.Bmr,
                    
                }).ToListAsync();

            return Ok(attributes);
        }

        [HttpPost("add")]
        public async Task<IActionResult> CreateAttributes([FromBody] AttributesDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in attributes/add");
            }

            var userAttributes = new UserAttributes
            {
                User = user,
                UserId = user.Id,
                Weight = dto.Weight,
                Height = dto.Height,
                MeasuredAt = dto.MeasuredAt
            };

            _context.UserAttributes.Add(userAttributes);

            var result = new AttributesResponseDto
            {
                Weight = userAttributes.Weight,
                Height = userAttributes.Height,
                Bmi = userAttributes.Bmi,
                MeasuredAt = userAttributes.MeasuredAt,
                Bmr = userAttributes.Bmr
            };


            await _context.SaveChangesAsync();
            return Created("api/users/me/attributes",
                new
                {
                    Message = "Attributes created successfully",
                    Data = result
                }
            );
        }

    }
}
