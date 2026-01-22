using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers
{
    [ApiController]
    [Route("api/activity")]
    public class ActivityContorller : Controller
    {
        private readonly HealthAppDbContext _context;

        public ActivityContorller(HealthAppDbContext context)
        {
            _context = context;

        }

        [HttpGet("all")]
        public async Task<IActionResult> GetActivities()
        {
            var activities = await _context.Activities.ToListAsync();
            return Ok(activities);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddActivity (ActivityDto activityDto)
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

    }
}
