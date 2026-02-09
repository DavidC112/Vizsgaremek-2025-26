using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Ingredients;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/ingredients")]
    [Authorize(Roles = "Admin")]
    public class IngredientAdminController : Controller
    {
        private readonly HealthAppDbContext _context;
        public IngredientAdminController(HealthAppDbContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddIngredient([FromBody] IngredientDto dto)
        {
            var ingredient = new Ingredient
            {
                Name = dto.Name,
                Calories = dto.Calories,
                Protein = dto.Protein,
                Carbohydrate = dto.Carbohydrate,
                Fat = dto.Fat
            };
            _context.Ingredients.Add(ingredient);
            await _context.SaveChangesAsync();
            return Created($"api/ingredient/{ingredient.Id}", null);
        }

        [HttpPatch("{id:int}/delete")]
        public async Task<IActionResult> SoftDeleteIngredient(int id)
        {
            var ingredient = await _context.Ingredients.FirstOrDefaultAsync(i => i.Id == id);
            if (ingredient == null)
            {
                return NotFound();
            }
            if (ingredient.IsDeleted)
            {
                return BadRequest("Ingredient is already deleted.");
            }
            ingredient.IsDeleted = true;
            await _context.SaveChangesAsync();
            return NoContent();
        }


        [HttpPatch("{id:int}/edit")]
        public async Task<IActionResult> UpdateIngredient(int id, [FromBody] IngredientUpdateDto dto)
        {
            var ingredient = await _context.Ingredients.FirstOrDefaultAsync(i => i.Id == id);
            if (ingredient == null)
            {  
                return NotFound("Ingredient was not found in ingredientAdmin/edit");
            }

            if (dto.Name != null)
            {
                ingredient.Name = dto.Name;
            }

            if (dto.Calories.HasValue)
            {
                ingredient.Calories = dto.Calories.Value;
            }

            if (dto.Protein.HasValue)
            {
                ingredient.Protein = dto.Protein.Value;
            }

            if (dto.Carbohydrate.HasValue)
            {
                ingredient.Carbohydrate = dto.Carbohydrate.Value;
            }

            if (dto.Fat.HasValue)
            {
                ingredient.Fat = dto.Fat.Value;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}

