using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Recipes;
using Vizsgaremek.DTOs.User;
using Vizsgaremek.Models;
using Vizsgaremek.Services;


namespace Vizsgaremek.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/users")]
    [Authorize(Roles = "Admin")]
    public class UserAdminController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly HealthAppDbContext _context;

        public UserAdminController(UserManager<User> userManager, HealthAppDbContext contex,
            CaloriesCalculationService caloriesCalc)
        {
            _userManager = userManager;
            _context = contex;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.IgnoreQueryFilters().ToListAsync();

            var rolesDictionary = new Dictionary<string, string>();

            foreach (var u in users)
            {
                var roles = await _userManager.GetRolesAsync(u);
                rolesDictionary[u.Id] = roles.FirstOrDefault();
            }

            var result = users.Select(u => new UsersResponseDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                ProfilePictureUrl = u.ProfilePictureUrl,
                Role = rolesDictionary.ContainsKey(u.Id) ? rolesDictionary[u.Id] : null,
                IsDeleted = u.IsDeleted
            }).ToList();



            return Ok(new { Message = "All users.", Data = result });
        }



        [HttpPatch("{id}/delete")]
        public async Task<IActionResult> DeleteUser([FromRoute] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound("User was not found in userAdmin/delete");
            }

            var loggedInUserId = _userManager.GetUserId(User);
            if (user.Id == loggedInUserId)
            {
                return StatusCode(418, "I'm a teapot!");
            }

            if (user.IsDeleted)
            {
                return BadRequest("User is already deleted");
            }
            user.IsDeleted = true;

            await _userManager.UpdateAsync(user);

            return Ok(new { Message = "User deleted successfully by admin" });
        }

        [HttpPatch("{id}/restore")]
        public async Task<IActionResult> RestoreUser([FromRoute] string id)
        {
            var user = await _context.Users
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound("Deleted User was not found in userAdmin/restore");
            }

            if (!user.IsDeleted)
            {
                return BadRequest("User is not deleted");
            }
            
            user.IsDeleted = false;

            await _userManager.UpdateAsync(user);

            return Ok(new { Message = "User successfully restored by admin" });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById([FromRoute] string id)
        {
            var user = await _context.Users
                .IgnoreQueryFilters()
                .Include(r => r.Recipes)
                .FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return NotFound("User was not found in userAdmin/get");
            }

            var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();

            var result = new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                IsDeleted = user.IsDeleted,
                ProfilePictureUrl = user.ProfilePictureUrl,
                Role = role,
                BirthDate = user.BirthDate,
            };
            
            return Ok(new {Message = "Single User data", data = result});
        }
    }
}