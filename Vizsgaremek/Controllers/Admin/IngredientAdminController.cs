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
    [Route("api/ingredients")]
    [Authorize(Roles = "Admin")]
    public class IngredientAdminController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;
        public IngredientAdminController(HealthAppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
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

        [HttpPatch("{id:int}/soft-delete")]
        public async Task<IActionResult> SoftDeleteIngredient(int id)
        {
            var ingredient = await _context.Ingredients.FirstOrDefaultAsync(i => i.Id == id);
            if (ingredient == null)
            {
                return NotFound();
            }
            ingredient.IsDeleted = true;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPatch("{id:int}/restore")]
        public async Task<IActionResult> RestoreIngredient(int id)
        {
            var ingredient = await _context.Ingredients.FirstOrDefaultAsync(i => i.Id == id);
            if (ingredient == null)
            {
                return NotFound();
            }
            ingredient.IsDeleted = false;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPatch("{id:int}/update")]
        public async Task<IActionResult> UpdateIngredient(int id, [FromBody] IngredientUpdateDto dto)
        {
            var ingredient = await _context.Ingredients.FirstOrDefaultAsync(i => i.Id == id);
            if (ingredient == null)
            {  
                return NotFound();
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

            return Ok($"api/ingredient/{id}");
        }

    }
}

