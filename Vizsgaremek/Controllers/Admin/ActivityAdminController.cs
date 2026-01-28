using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Activites;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers.Admin
{
    [ApiController]
    [Route("api/activities")]
    [Authorize(Roles = "Admin")]
    public class ActivityAdminController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;
        public ActivityAdminController(HealthAppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddActivity([FromBody] ActivityDto activityDto)
        {
            var activity = new Activity
            {
                Name = activityDto.Name,
                CaloriesBurnedPerHour = activityDto.CaloriesBurnedPerHour
            };
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();
            return Ok(activity);
        }

        [HttpPatch("{id:int}/soft-delete")]
        public async Task<IActionResult> SoftDeleteActivity(int id)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == id);
            if (activity == null)
            {
                return NotFound();
            }
            activity.IsDeleted = true;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPatch("{id:int}/restore")]
        public async Task<IActionResult> RestoreActivity(int id)
        {
            var activity = await _context.Activities.IgnoreQueryFilters().FirstOrDefaultAsync(a => a.Id == id);
            if (activity == null)
            {
                return NotFound();
            }
            activity.IsDeleted = false;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPatch("{id:int}/update")]
        public async Task<IActionResult> UpdateActivity(int id, [FromBody] ActivityUpdateDto activityDto)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == id);
            if (activity == null)
            {
                return NotFound();
            }
            if (activityDto.Name != null)
            {
                activity.Name = activityDto.Name;
            }
            if(activityDto.CaloriesBurnedPerHour.HasValue)
            {
                activity.CaloriesBurnedPerHour = activityDto.CaloriesBurnedPerHour.Value;
            }

            await _context.SaveChangesAsync();

            return Ok(activity);
        }
    }
}
