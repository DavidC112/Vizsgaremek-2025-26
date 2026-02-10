using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Activity;


namespace Vizsgaremek.Controllers.Public
{
    [ApiController]
    [Route("api/activity")]
    public class ActivityController : Controller
    {
        private readonly HealthAppDbContext _context;

        public ActivityController(HealthAppDbContext context)
        {
            _context = context;

        }

        [HttpGet("all")]
        public async Task<IActionResult> GetActivities()
        {
            var activities = await _context.Activities.Select(a => new ActivityDto
            {
                Name = a.Name,
                CaloriesBurnedPerHour = a.CaloriesBurnedPerHour
            }).ToListAsync();

            return Ok(activities);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetActivity(int id)
        {
            var activity = await _context.Activities.Where(a => a.Id == id).Select(a => new ActivityDto
            {
                Name = a.Name,
                CaloriesBurnedPerHour = a.CaloriesBurnedPerHour
            }).FirstOrDefaultAsync();
            if (activity == null)
            {
                return NotFound("Activity was not found in activity/id");
            }
            return Ok(activity);
        }
    }
}
