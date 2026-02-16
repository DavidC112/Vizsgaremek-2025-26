using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Meal;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers.Public
{
    [ApiController]
    [Route("api/users/me/meals")]

    public class MealController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;
        public MealController(HealthAppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetMeals()
        {
            var user = await _userManager.GetUserAsync(User);
            if(user == null)
            {
                return Unauthorized("User was not found in  meal/");
            }

            var result = await _context.Meals.Where(r => r.UserId == user.Id).Where(r => r.Log == DateOnly.FromDateTime(DateTime.Now))
                .Include(r => r.Recipe)
                .Include(r => r.Ingredient)
                .IgnoreQueryFilters()
                .Select(r => new MealResponseDto
                {
                    MealName = r.MealName,
                    Category = r.Category,
                    Id = r.Id,
                    RecipeId = r.RecipeId,
                    IngredientId = r.IngredientId,
                    Amount = r.Amount,
                    Calories = r.CalculateNutrition().Calories,
                    Protein = r.CalculateNutrition().Protein,
                    Fat = r.CalculateNutrition().Fat,
                    Carbohydrate = r.CalculateNutrition().Carbohydrate
                }).ToListAsync();

            return Ok(new { Message = $"{user.FirstName} {user.LastName}'s meals.", Data = result });
        }


        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddMeal([FromBody] MealCreateDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in meals/add");
            }

            if (dto.IngredientId != null && dto.RecipeId != null)
            {
                return BadRequest("You cannot specify both IngredientId and RecipeId.");
            }

            if (dto.IngredientId == null && dto.RecipeId == null)
            {
                return BadRequest("You must specify either IngredientId or RecipeId.");
            }

            Ingredient? existIngredient = null;
            Recipe? existRecipe = null;

            if (dto.IngredientId != null)
            {
                existIngredient = await _context.Ingredients.FindAsync(dto.IngredientId);
                if (existIngredient == null)
                {
                    return NotFound("Ingredient not found in meal/add.");
                }
            }

            if (dto.RecipeId != null)
            {
                existRecipe = await _context.Recipes.FindAsync(dto.RecipeId);
                if (existRecipe == null)
                {
                    return NotFound("Recipe not found in meal/add");
                }
            }

            

            var meal = new Meal
            {
                UserId = user.Id,
                User = user,
                IngredientId = dto.IngredientId,
                RecipeId = dto.RecipeId,
                Amount = dto.Amount,
                MealName = dto.RecipeId != null ? existRecipe!.Name : existIngredient!.Name,
                Category = dto.Category,
                Recipe = existRecipe,
                Ingredient = existIngredient
            };

            var nutrition = meal.CalculateNutrition();

            _context.Meals.Add(meal);
            await _context.SaveChangesAsync();

            var result = new MealResponseDto
            {
                MealName = meal.MealName,
                Category = meal.Category,
                Id = meal.Id,
                RecipeId = meal.RecipeId,
                IngredientId = meal.IngredientId,
                Amount = meal.Amount,
                Calories = nutrition.Calories,
                Protein = nutrition.Protein,
                Fat = nutrition.Fat,
                Carbohydrate = nutrition.Carbohydrate
            };

            return Created ($"api/users/me/meals/{meal.Id}", new
            {
                Message = "Meal successfully added.",
                Data = result
            });
        }
     
    }
}
