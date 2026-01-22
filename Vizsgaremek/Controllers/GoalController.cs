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


        [HttpGet("test")]
        public async Task<IActionResult> GetGoals()
        {
            var goals = await _context.Goals.Include(g => g.User).Select(g => new GoalResponseDto
            {
                Id = g.Id,
                UserId = g.UserId,
                TargetWeight = g.TargetWeight,
                TargetDate = g.DeadLine,
                User = new DTOs.Attributes.UserDataResponseDto
                {
                    FirstName = g.User.FirstName,
                    LastName = g.User.LastName,
                    Email = g.User.Email
                }
            }).ToListAsync();
            return Ok(goals);
        }

        [HttpGet("")]
        [Authorize]
        public async Task<IActionResult> GetLoggedUserGoals()
        {
            var userId = await _userManager.GetUserAsync(User);
            if (userId == null)
            {
                return Unauthorized();
            }
            var goals = await _context.Goals
                .Where(g => g.UserId == userId.Id)
                .Select(g => new GoalDto
                {
                    TargetWeight = g.TargetWeight,
                    DeadLine = g.DeadLine
                })
                .FirstOrDefaultAsync();
            return Ok(goals);
        }


            [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddGoal([FromBody] GoalDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }
            var existing = await _context.Goals.FirstOrDefaultAsync(g => g.UserId == user.Id);
            if (existing != null)
            {
                existing.TargetWeight = dto.TargetWeight;
                existing.DeadLine = dto.DeadLine;
                _context.Goals.Update(existing);
                await _context.SaveChangesAsync();
                var updateResponseDto = new GoalDto
                {
                    TargetWeight = existing.TargetWeight,
                    DeadLine = existing.DeadLine
                };
                return Ok(updateResponseDto);
            }
            var goal = new UserGoal
            {
                UserId = user.Id,
                TargetWeight = dto.TargetWeight,
                DeadLine = dto.DeadLine
            };

            _context.Goals.Add(goal);

            var result = new GoalDto
            {
                TargetWeight = goal.TargetWeight,
                DeadLine = goal.DeadLine
            };
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AddGoal),new { id = goal.Id, result });
        }

    }
}
