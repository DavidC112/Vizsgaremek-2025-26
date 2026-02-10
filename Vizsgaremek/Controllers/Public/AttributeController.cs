using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs;
using Vizsgaremek.DTOs.Attributes;
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
                .Select(ua => new AttributesDto
                {
                    Weight = ua.Weight,
                    Height = ua.Height,
                    MeasuredAt = ua.MeasuredAt
                })
                .FirstOrDefaultAsync();

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

            var result = new AttributesDto
            {
                Weight = userAttributes.Weight,
                Height = userAttributes.Height,
                MeasuredAt = userAttributes.MeasuredAt
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
