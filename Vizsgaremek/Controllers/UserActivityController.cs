using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers
{
    [ApiController]
    [Route("api/users/me/activities")]
    public class UserActivityController : Controller
    {   
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;

        public UserActivityController(HealthAppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetLoggedUserActivities()
        {
            var user = await _userManager.GetUserAsync(User);
            if(user == null)
            {
                return Unauthorized();
            }
            var activities = _context.UserActivities
                .Where(ua => ua.UserId == user.Id).Select(ua => new UserActivityResponseDto
                {
                    ActivityName = ua.Activity.Name,
                    Duration = ua.Duration,
                    CaloriesBurned = (ua.Activity.CaloriesBurnedPerHour * ua.Duration) / 60m
                })
                .ToList();
            return Ok(activities);
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> CreateActivity([FromBody] UserActivityDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if(user == null)
            {
                return Unauthorized();
            }
            var activity = _context.Activities.FirstOrDefault(a => a.Name == dto.ActivityName);
            if(activity == null)
            {
                return BadRequest("Activity not found");
            }
            
            var userActivity = new UserActivity
            {
                UserId = user.Id,
                ActivityId = activity.Id,
                Activity = activity,
                User = user,
                Duration = dto.Duration,
            };

            _context.UserActivities.Add(userActivity);
            await _context.SaveChangesAsync();

            var response = new UserActivityResponseDto
            {
                Duration = userActivity.Duration,
                ActivityName = activity.Name,
                CaloriesBurned = userActivity.CaloriesBurned
            };

            return CreatedAtAction(nameof(GetLoggedUserActivities), response);
        }
    }
}
