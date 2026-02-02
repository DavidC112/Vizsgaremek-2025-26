using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Recipes;
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
            var recipes = await _context.Recipes
                 .Include(r => r.RecipeIngredients)
                     .ThenInclude(ri => ri.Ingredient)
                 .ToListAsync();
            if (recipes == null || recipes.Count == 0)
            {
                return Ok("There are no recipes");
            }

            var response = recipes.Select(recipe => new RecipeResponseDto
            {
                Id = recipe.Id,
                Name = recipe.Name,
                PreparationTime = recipe.PreparationTime,
                CookingTime = recipe.CookingTime,
                Description = recipe.Description,
                Portions = recipe.Portions,
                IsCommunity = recipe.IsCommunity,
                Ingredients = recipe.RecipeIngredients
                    .Where(ri => !ri.Ingredient.IsDeleted)
                    .Select(ri => new RecipeIngredientResponseDto
                    {
                        IngredientId = ri.IngredientId,
                        IngredientName = ri.Ingredient.Name,
                        Amount = ri.Amount
                    })
                    .ToList()
            }).ToList();

            return Ok(response);
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetRecipe(int id)
        {
            var recipe = await _context.Recipes
                .Include(r => r.RecipeIngredients)
                    .ThenInclude(ri => ri.Ingredient)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (recipe == null)
            {
                return NotFound();
            }

            var response = new RecipeResponseDto
            {
                Id = recipe.Id,
                Name = recipe.Name,
                PreparationTime = recipe.PreparationTime,
                CookingTime = recipe.CookingTime,
                Description = recipe.Description,
                Portions = recipe.Portions,
                IsCommunity = recipe.IsCommunity,
                Ingredients = recipe.RecipeIngredients
                    .Where(ri => !ri.Ingredient.IsDeleted)
                    .Select(ri => new RecipeIngredientResponseDto
                    {
                        IngredientId = ri.IngredientId,
                        IngredientName = ri.Ingredient.Name,
                        Amount = ri.Amount
                    })
                    .ToList()
            };

            return Ok(response);
        }


        [HttpPost("create/community")]
        [Authorize]
        public async Task<IActionResult> CreateRecipe([FromBody] RecipeCreateDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) 
            {
                return NotFound(); 
            }

            var recipe = new Recipe
            {
                UserId = user.Id,
                Name = dto.Name,
                PreparationTime = dto.PreparationTime,
                CookingTime = dto.CookingTime,
                Description = dto.Description,
                Portions = dto.Portions,
                IsCommunity = true,
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

        [HttpDelete("delete/community/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteOwnRecipe(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound();
            }

            var recipe = await _context.Recipes.FindAsync(id);

            if (user.Id != recipe.UserId)
            {
                return StatusCode(403, "You are not allowed to delete other user's recipes");
            }
            
            
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
