using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.Models;


namespace Vizsgaremek.Controllers
{
    [ApiController]
    [Route("api/")]
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;
        public AdminController(HealthAppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpDelete("delete-user/{email}")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            var loggedInUserId = _userManager.GetUserId(User);
            if (user.Id == loggedInUserId)
            {
                return StatusCode(418, "I'm a teapot!");
            }

            var result = await _userManager.DeleteAsync(user);

            return Ok();
        }
        #region Activity management endpoints

        [HttpPost("activities/add")]
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

        [HttpDelete("activities/delete/{name}")]
        public async Task<IActionResult> DeleteActivity(string name)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Name == name);
            if (activity == null)
            {
                return NotFound();
            }
            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();
            return Ok();
        }


        #endregion
    }
}