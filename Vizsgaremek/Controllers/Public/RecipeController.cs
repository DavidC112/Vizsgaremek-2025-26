using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Vizsgaremek.Data;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers.Public
{
    [ApiController]
    [Route("api/recipe")]
    public class RecipeController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;
        public RecipeController(HealthAppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllRecipes()
        {
            var recipes = _context.Recipes.ToList();
            return Ok();
        }
    }
}
