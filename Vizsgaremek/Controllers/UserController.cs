using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs;
using Vizsgaremek.DTOs.Goal;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : Controller
    {
        public HealthAppDbContext _context;
        public UserManager<User> _userManager;

        public UserController(HealthAppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .Include(u => u.UserAttributes)
                .Include(u => u.Goals)
                .Select(u => new UserResponseDto
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    UserAttributes = u.UserAttributes == null ? null : new AttributesDto
                    {
                        Weight = u.UserAttributes.Weight,
                        Height = u.UserAttributes.Height,
                        MeasuredAt = u.UserAttributes.MeasuredAt
                    },
                    UserGoal = u.Goals == null ? null : new GoalDto
                    {
                        TargetWeight = u.Goals.TargetWeight,
                        DeadLine = u.Goals.DeadLine
                    }
                })
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetLoggedUser()
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null) return Unauthorized();

            var user = await _context.Users.Include(u => u.UserAttributes).Include(u => u.Goals).FirstOrDefaultAsync(u => u.Id == userId);
            
            var response = new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserAttributes = user.UserAttributes == null ? null : new AttributesDto
                {
                    Weight = user.UserAttributes.Weight,
                    Height = user.UserAttributes.Height,
                    MeasuredAt = user.UserAttributes.MeasuredAt
                },
                UserGoal = user.Goals == null ? null : new GoalDto
                {
                    TargetWeight = user.Goals.TargetWeight,
                    DeadLine = user.Goals.DeadLine
                }
            };

            return Ok(response);

        }
    }
}
