using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs;
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
            context = _context;
            userManager = _userManager;
        }


        [HttpGet("test")]
        public async Task<IActionResult> Get()
        {
            var attributes = await _context.UserAttributes.ToListAsync();
            return Ok(attributes);
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult>Create([FromBody] AttributesDto dto)
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
                return Ok(existing);
            }
            var userAttributes = new UserAttributes
            {
                UserId = user.Id,
                Weight = dto.Weight,
                Height = dto.Height,
                MeasuredAt = dto.MeasuredAt
            };


            return Created();
        } 
            
    }
}
