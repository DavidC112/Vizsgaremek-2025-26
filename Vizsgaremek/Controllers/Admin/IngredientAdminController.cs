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
    [Route("api/admin/ingredient")]
    [Authorize(Roles = "Admin")]
    public class IngredientAdminController : Controller
    {
        private readonly HealthAppDbContext _context;
        public IngredientAdminController(HealthAppDbContext context)
        {
            _context = context;
        }
        
        
        [HttpGet("all")]
        public async Task<IActionResult> GetIngredients()
        {
            var ingredients = await _context.Ingredients.IgnoreQueryFilters().Select(i => new IngredientResponseDto
            {
                Id = i.Id,
                Name = i.Name,
                Calories = i.Calories,
                Protein = i.Protein,
                Carbohydrate = i.Carbohydrate,
                Fat = i.Fat,
                IsDeleted  = i.IsDeleted
            }).ToListAsync();

            return Ok(ingredients);
        }
        

        [HttpPost("add")]
        public async Task<IActionResult> AddIngredient([FromBody] IngredienCreatetDto dto)
        {
            var ingredients = await _context.Ingredients.IgnoreQueryFilters().ToListAsync();
            if (ingredients.Any(i => i.Name == dto.Name))
            {
                return BadRequest("Ingredient with that name already exist");
            }
             
            var ingredient = new Ingredient
            {
                Name = dto.Name,
                Calories = dto.Calories,
                Protein = dto.Protein,
                Carbohydrate = dto.Carbohydrate,
                Fat = dto.Fat
            };

            
            var result = new IngredientResponseDto
            {
                Id = ingredient.Id,
                Name = ingredient.Name,
                Calories = ingredient.Calories,
                Protein = ingredient.Protein,
                Carbohydrate = ingredient.Carbohydrate,
                Fat = ingredient.Fat
            };

            _context.Ingredients.Add(ingredient);
            await _context.SaveChangesAsync();
            return Created($"api/ingredient/{ingredient.Id}", 
                new 
                {
                    Message = "Ingredient created successfully",
                    Data = result
                });
        }

        [HttpPatch("{id:int}/delete")]
        public async Task<IActionResult> DeleteIngredient(int id)
        {
            var ingredient = await _context.Ingredients.FirstOrDefaultAsync(i => i.Id == id);
            if (ingredient == null)
            {
                return NotFound("Ingredient was not found in  ingredientAdmin/delete");
            }
            if (ingredient.IsDeleted)
            {
                return BadRequest("Ingredient is already deleted.");
            }
            ingredient.IsDeleted = true;
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Ingredient deleted successfully" });
        }
        
        [HttpPatch("{id:int}/restore")]
        public async Task<IActionResult> RestoreIngredient(int id)
        {
            var ingredient = await _context.Ingredients.IgnoreQueryFilters().FirstOrDefaultAsync(i => i.Id == id);
            if (ingredient == null)
            {
                return NotFound("Ingredient wass not found in  ingredientAdmin/restore");
            }
            if (!ingredient.IsDeleted)
            {
                return BadRequest("Ingredient is not deleted.");
            }
            ingredient.IsDeleted = false;
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Ingredient restored successfully" });
        }


        [HttpPatch("{id:int}/edit")]
        public async Task<IActionResult> UpdateIngredient(int id, [FromBody] IngredientUpdateDto dto)
        {
            var ingredient = await _context.Ingredients.FirstOrDefaultAsync(i => i.Id == id);
            if (ingredient == null)
            {  
                return NotFound("Ingredient was not found in ingredientAdmin/edit");
            }

            ingredient.Name = dto.Name ?? ingredient.Name;
            ingredient.Calories = dto.Calories ?? ingredient.Calories;
            ingredient.Protein = dto.Protein ?? ingredient.Protein;
            ingredient.Carbohydrate = dto.Carbohydrate ?? ingredient.Carbohydrate;
            ingredient.Fat = dto.Fat ?? ingredient.Fat;

            var result = new IngredientResponseDto
            {
                Id = ingredient.Id,
                Name = ingredient.Name,
                Calories = ingredient.Calories,
                Protein = ingredient.Protein,
                Carbohydrate = ingredient.Carbohydrate,
                Fat = ingredient.Fat
            };

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Ingredient updated successfully", Data = result });
        }

    }
}

