using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using Vizsgaremek.Data;
using Vizsgaremek.Models;


namespace Vizsgaremek.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/users")]
    [Authorize(Roles = "Admin")]
    public class UserAdminController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly HealthAppDbContext _context;
        public UserAdminController(UserManager<User> userManager, HealthAppDbContext contex)
        {
            _userManager = userManager;
            _context = contex;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetUsers([FromQuery] string? email, [FromQuery] bool showDeleted = false)
        {
            var query = _context.Users.AsQueryable();

            if (showDeleted)
                query = query.IgnoreQueryFilters();

            if (!string.IsNullOrEmpty(email))
                query = query.Where(u => u.Email.Contains(email));

            var users = await query.ToListAsync();
            return Ok(users);
        }



        [HttpPatch("{id}/delete-user")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var loggedInUserId = _userManager.GetUserId(User);
            if (user.Id == loggedInUserId)
            {
                return StatusCode(418, "I'm a teapot!");
            }
            

            user.UserName = "deleted_user";
            user.IsDeleted = true;

            await _userManager.UpdateAsync(user);


            return Ok("User successfully deleted");
        }

        [HttpPatch("{id}/restore-user")]
        public async Task<IActionResult> RestoreUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if(user == null)
            {
                return NotFound();
            }

            user.UserName = user.Email;
            user.IsDeleted = true;

            return Ok("User successfully restored");
        }

    }
}