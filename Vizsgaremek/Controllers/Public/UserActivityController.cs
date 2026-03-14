using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Activites;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers.Public
{
    [ApiController]
    [Route("api/users/me/activities")]
    [Authorize]
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
            if (user == null)
            {
                return Unauthorized("User was not found in userActivity/");
            }

            var cutoff = DateOnly.FromDateTime(DateTime.Now.AddDays(-7));
            var result = await _context.UserActivities
                .Where(ua => ua.UserId == user.Id && ua.Log  >= cutoff)
                .Include(ua => ua.Activity)
                .IgnoreQueryFilters()
                .Select(ua => new UserActivityResponseDto
                {
                    Id = ua.Id,
                    ActivityName = ua.Activity.Name,
                    ActivityId = ua.ActivityId,
                    Duration = ua.Duration,
                    CaloriesBurned = ua.CaloriesBurned,
                    Date = ua.Log
                }).ToListAsync();

            return Ok(new {Message = $"{user.FirstName} {user.LastName}'s activities", Data = result});
        }

        [HttpPost("add")]
        public async Task<IActionResult> CreateActivity([FromBody] UserActivityDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in userActivity/add");
            }
            var activity = _context.Activities.FirstOrDefault(a => a.Id == dto.ActivityId);
            if (activity == null)
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

            var result = new UserActivityResponseDto
            {
                Id = userActivity.Id,
                ActivityName = activity.Name,
                Duration = userActivity.Duration,
                CaloriesBurned = userActivity.CaloriesBurned
            };

            return Created("api/users/me/activities",
                new
                {
                    Message = "Activity added successfully",
                    Data = result
                });
        }

        [HttpPatch("{id:int}/edit")]
        public async Task<IActionResult> EditActivity([FromRoute] int id, [FromBody] UserActivityUpdateDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in userActivity/edit");
            }
            var userActivity = await _context.UserActivities.FirstOrDefaultAsync(ua => ua.Id == id && ua.UserId == user.Id);

            if (userActivity == null)
            {
                return NotFound("User activity not found in userActivity/edit");
            }
            var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == userActivity.ActivityId);
            if (activity == null)
            {
                return BadRequest("Activity not found");
            }
            
            userActivity.Duration = dto.Duration ?? userActivity.Duration;

            _context.UserActivities.Update(userActivity);
            await _context.SaveChangesAsync();
            var result = new UserActivityResponseDto
            {
                Id = userActivity.Id,
                ActivityName = activity.Name,
                Duration = userActivity.Duration,
                CaloriesBurned = userActivity.CaloriesBurned
            };
            return Ok(new { Message = "User activity updated successfully", Data = result });
        }
    }
}
