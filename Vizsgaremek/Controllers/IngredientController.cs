using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Ingredients;

namespace Vizsgaremek.Controllers
{
    [ApiController]
    [Route("api/ingredient")]
    public class IngredientController : Controller
    {
        private readonly HealthAppDbContext _context;
        public IngredientController(HealthAppDbContext context)
        {
            _context = context;
        }


        [HttpGet("all")]
        public async Task<IActionResult> GetIngredients()
        {
            var ingredients = await _context.Ingredients.Select(i => new IngredientDto
            {
                Name = i.Name,
                Calories = i.Calories,
                Protein = i.Protein,
                Carbohydrates = i.Carbohydrates,
                Fats = i.Fats
            }).ToListAsync();
            return Ok();
        }
    }
}
