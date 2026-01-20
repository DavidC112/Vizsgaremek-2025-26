using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs;
using Vizsgaremek.DTOs.Attributes;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers
{
    [ApiController]
    [Route("api/profile/attribute")]
    public class AttributeController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;
        public AttributeController(HealthAppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        [HttpGet("test")]
        public async Task<IActionResult> GetAttributes()
        {
            var attributes = await _context.UserAttributes.Include(ua => ua.User).Select(ua => new AttributesResponseDto
            {
                Id = ua.Id,
                Weight = ua.Weight,
                Height = ua.Height,
                MeasuredAt = ua.MeasuredAt,
                Bmi = ua.Bmi,
                User =  new UserDataResponseDto
                {
                    FirstName = ua.User.FirstName,
                    LastName = ua.User.LastName,
                    Email = ua.User.Email
                }
            }).ToListAsync();
            return Ok(attributes);
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult>CreateAttributes([FromBody] AttributesDto dto)
        {
                var user = await _userManager.GetUserAsync(User);
            if (user == null)  return Unauthorized(); 

            var existing = await _context.UserAttributes.FirstOrDefaultAsync(ua => ua.UserId == user.Id);
            if (existing != null)
            {
                existing.Weight = dto.Weight;
                existing.Height = dto.Height;
                existing.MeasuredAt = dto.MeasuredAt;
                _context.UserAttributes.Update(existing);
                await _context.SaveChangesAsync();
                var resultDtoUpdate = new AttributesDto
                {
                    Weight = existing.Weight,
                    Height = existing.Height,
                    MeasuredAt = existing.MeasuredAt
                };

                return Ok(resultDtoUpdate);
            }
            var userAttributes = new UserAttributes
            {
                UserId = user.Id,
                Weight = dto.Weight,
                Height = dto.Height,
                MeasuredAt = dto.MeasuredAt
            };

            _context.UserAttributes.Add(userAttributes);

            var resultDto = new AttributesDto
            {
                Weight = userAttributes.Weight,
                Height = userAttributes.Height,
                MeasuredAt = userAttributes.MeasuredAt
            };


            await _context.SaveChangesAsync();
            return CreatedAtAction(
                nameof(CreateAttributes),
                new { id = userAttributes.Id },
                resultDto);

        }

    }
}
