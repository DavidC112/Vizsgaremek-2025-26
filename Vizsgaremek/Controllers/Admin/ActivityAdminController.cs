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
    [Route("api/admin/activities")]
    [Authorize(Roles = "Admin")]
    public class ActivityAdminController : Controller
    {
        private readonly HealthAppDbContext _context;
        public ActivityAdminController(HealthAppDbContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddActivity([FromBody] ActivityDto activityDto)
        {
            var activity = new Activity
            {
                Name = activityDto.Name,
                CaloriesBurnedPerHour = activityDto.CaloriesBurnedPerHour
            };

            var result = new ActivityResponseDto
            {
                Id = activity.Id,
                Name = activity.Name,
                CaloriesBurnedPerHour = activity.CaloriesBurnedPerHour
            };

            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();
            return Created($"api/activity/{activity.Id}",
                new
                {
                    Message = "Activity created successfully",
                    Data = result
                });
        }

        [HttpPatch("{id:int}/delete")]
        public async Task<IActionResult> SoftDeleteActivity(int id)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == id);
            if (activity == null)
            {
                return NotFound("Activity is not found in activityAdmin/add");
            }
            activity.IsDeleted = true;
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Activity deleted successfully" });
        }


        [HttpPatch("{id:int}/edit")]
        public async Task<IActionResult> UpdateActivity(int id, [FromBody] ActivityUpdateDto activityDto)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == id);
            if (activity == null)
            {
                return NotFound("Activity was not found in activityAdmin/edit");
            }
            if (activityDto.Name != null)
            {
                activity.Name = activityDto.Name;
            }
            if(activityDto.CaloriesBurnedPerHour.HasValue)
            {
                activity.CaloriesBurnedPerHour = activityDto.CaloriesBurnedPerHour.Value;
            }

            var result = new ActivityResponseDto
            {
                Id = activity.Id,
                Name = activity.Name,
                CaloriesBurnedPerHour = activity.CaloriesBurnedPerHour
            };

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Activity edited successfully", Data = result });
        }
    }
}
