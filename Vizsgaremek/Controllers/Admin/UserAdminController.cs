using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Vizsgaremek.Models;


namespace Vizsgaremek.Controllers.Admin
{
    [ApiController]
    [Route("api/")]
    [Authorize(Roles = "Admin")]
    public class UserAdminController : Controller
    {
        private readonly UserManager<User> _userManager;
        public UserAdminController(UserManager<User> userManager)
        {
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

            return Ok("User successfully deleted");
        }
    }
}