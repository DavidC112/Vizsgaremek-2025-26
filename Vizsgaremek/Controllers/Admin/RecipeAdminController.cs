using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Recipes;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/recipe")]
    [Authorize(Roles = "Admin")]
    public class RecipeAdminController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;

        public RecipeAdminController(HealthAppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRecipe([FromBody] RecipeCreateDto dto)
        {
            var recipe = new Recipe
            {
                UserId = null,
                Name = dto.Name,
                PreparationTime = dto.PreparationTime,
                CookingTime = dto.CookingTime,
                Description = dto.Description,
                Portions = dto.Portions,
                IsCommunity = false,
                RecipeIngredients = new List<RecipeIngredient>()
            };

            foreach (var item in dto.Ingredients)
            {
                var ingredient = await _context.Ingredients
                    .FirstOrDefaultAsync(i => i.Id == item.IngredientId && !i.IsDeleted);

                if (ingredient == null)
                {
                    return BadRequest($"Ingredient with ID {item.IngredientId} not found.");
                }

                recipe.RecipeIngredients.Add(new RecipeIngredient
                {
                    IngredientId = ingredient.Id,
                    Amount = item.Amount
                });
            }   
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return Created($"api/recipe/{recipe.Id}", null);
        }

        [HttpDelete("{id:int}/delete")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound();
            }

            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}