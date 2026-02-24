using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Ingredients;

namespace Vizsgaremek.Controllers.Public
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
            var ingredients = await _context.Ingredients.Select(i => new IngredientResponseDto
            {
                Id = i.Id,
                Name = i.Name,
                Calories = i.Calories,
                Protein = i.Protein,
                Carbohydrate = i.Carbohydrate,
                Fat = i.Fat,
                IsDeleted = i.IsDeleted
            }).ToListAsync();

            return Ok(ingredients);
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetIngredient(int id)
        {
            var ingredient = await _context.Ingredients.Where(i => i.Id == id).FirstOrDefaultAsync();
            if (ingredient == null)
            {
                return NotFound("Ingredient was not found in ingredient/id");
            }
            var response = new IngredientResponseDto
            {
                Id  = ingredient.Id,
                Name = ingredient.Name,
                Calories = ingredient.Calories,
                Protein = ingredient.Protein,
                Carbohydrate = ingredient.Carbohydrate,
                Fat = ingredient.Fat
            };
            return Ok(response);
        }
    }
}
