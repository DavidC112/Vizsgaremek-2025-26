using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Goal;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers.Public
{
    [ApiController]
    [Route("api/users/me/goal")]
    public class GoalController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;
        public GoalController(HealthAppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetLoggedUserGoals()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in goal/");
            }
            var goals = await _context.UserGoals
                .Where(g => g.UserId == user.Id)
                .Select(g => new GoalDto
                {
                    TargetWeight = g.TargetWeight,
                    DeadLine = g.DeadLine,
                })
                .FirstOrDefaultAsync();

            return Ok(new {Message = $"{user.FirstName} {user.LastName}'s goals.", Data = goals});
        }


        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddGoal([FromBody] GoalDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in goal/add");
            }
            var existing = await _context.UserGoals.FirstOrDefaultAsync(g => g.UserId == user.Id);
            if (existing != null)
            {
                existing.TargetWeight = dto.TargetWeight;
                existing.DeadLine = dto.DeadLine;
                _context.UserGoals.Update(existing);
                await _context.SaveChangesAsync();
                var updateResponseDto = new GoalResponseDto
                {
                    Id = existing.Id,
                    UserId = user.Id,
                    TargetWeight = existing.TargetWeight,
                    TargetDate = existing.DeadLine
                };
                return Ok(new {Message = "Goals updated successfully", Data = updateResponseDto});
            }
            var goal = new UserGoal
            {
                User = user,
                UserId = user.Id,
                TargetWeight = dto.TargetWeight,
                DeadLine = dto.DeadLine
            };

            _context.UserGoals.Add(goal);
            await _context.SaveChangesAsync();

            var result = new GoalResponseDto
            {
                Id = goal.Id,
                UserId = goal.UserId,
                TargetWeight = goal.TargetWeight,
                TargetDate = goal.DeadLine
            };

            return Created("api/users/me/goal", 
                new
                {
                    message = "Goal created successfully",
                    data = result
                });

        }

    }
}
