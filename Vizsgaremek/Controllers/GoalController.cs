using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Vizsgaremek.Data;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers
{
    [ApiController]
    [Route("api/profile/goal")]
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
        public async Task<IActionResult> GetGoals()
        {
            return Ok();
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddGoal()
        {



            return Ok();
        }

    }
}
