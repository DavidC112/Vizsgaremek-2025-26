using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Recipes;
using Vizsgaremek.DTOs.UserDto;
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
        private readonly ImageKitService _imageKit;

        public RecipeAdminController(HealthAppDbContext context, UserManager<User> userManager, ImageKitService imageKit)
        {
            _context = context;
            _userManager = userManager;
            _imageKit = imageKit;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRecipe([FromBody] RecipeCreateDto dto)
        {
            var recipe = new Recipe
            {
                UserId = null,
                Name = dto.Name,
                Category = dto.Category,
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

        [HttpPost("create/{id:int}/upload-image")]
        public async Task<IActionResult> UploadRecipeImage([FromRoute] int id, [FromForm] UploadImageDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            var recipe = await _context.Recipes.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            if (user.Id != recipe.UserId)
            {
                return StatusCode(403, "You are not allowed to upload images for other user's recipes");
            }

            if (recipe == null)
            {
                return NotFound();
            }

            if (dto.File == null || dto.File.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var imageUrl = await _imageKit.UploadImage(dto.File);

            recipe.ImageUrl = imageUrl.Url;
            recipe.FileId = imageUrl.FileId;

            _context.Recipes.Update(recipe);
            await _context.SaveChangesAsync();
            return Ok(new { imageUrl.Url });

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

            await _imageKit.DeleteImage(recipe.FileId);
            recipe.IsDeleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}