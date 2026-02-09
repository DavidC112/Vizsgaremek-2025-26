using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers.Public
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

        [HttpGet]
        public async Task<IActionResult> GetLoggedUserActivities()
        {
            var user = await _userManager.GetUserAsync(User);
            if(user == null)
            {
                return Unauthorized("User was not found in userActivity/");
            }
            var activities = await _context.UserActivities
                .Where(ua => ua.UserId == user.Id)
                .Include(ua => ua.Activity)
                .IgnoreQueryFilters()
                .Select(ua => new UserActivityResponseDto
                {
                    ActivityName = ua.Activity.Name,
                    Duration = ua.Duration,
                    CaloriesBurned = ua.CaloriesBurned
                }).ToListAsync();

            return Ok(activities);
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> CreateActivity([FromBody] UserActivityDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if(user == null)
            {
                return Unauthorized("User was not found in userActivity/add");
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
                ActivityName = activity.Name,
                Duration = userActivity.Duration,
                CaloriesBurned = userActivity.CaloriesBurned
            };

            return Created("api/users/me/activities", response);
        }
    }
}
