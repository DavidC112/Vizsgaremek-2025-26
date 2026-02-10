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
            if (user == null)
            {
                return Unauthorized();
            }
            var meals = await _context.Meals
                .Where(m => m.UserId == user.Id)
                .Include(m => m.MealItems)
                    .ThenInclude(mi => mi.Recipe)
                .Include(m => m.MealItems)
                    .ThenInclude(mi => mi.Ingredient)
                .Select(m => new MealResponseDto
                {
                    Id = m.Id,
                    MealName = m.MealName,

                    Items = m.MealItems.Select(i => new MealItemResponseDto
                    {
                        Id = i.Id,
                        RecipeId = i.RecipeId,
                        IngredientId = i.IngredientId,
                        Amount = i.Amount
                    }).ToList()

                }).ToListAsync();

            return Ok(meals);
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddMeal(MealCreateDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in meal/add");
            }

            var meal = new Meal
            {
                MealName = dto.MealName,
                UserId = user.Id,
                MealItems = new List<MealItem>()
            };

            foreach(var itemDto in dto.Items)
            {
                Recipe recipe = null;
                Ingredient ingredient = null;

                if (!itemDto.RecipeId.HasValue && !itemDto.IngredientId.HasValue)
                {
                    return BadRequest("MealItem must have either RecipeId or IngredientId.");
                }

                if (itemDto.RecipeId.HasValue && itemDto.IngredientId.HasValue)
                {
                    return BadRequest("MealItem cannot have both RecipeId and IngredientId.");
                }

                if (itemDto.RecipeId.HasValue && itemDto.RecipeId.Value > 0)
                {
                    recipe = await _context.Recipes
                        .Include(r => r.RecipeIngredients)
                        .FirstOrDefaultAsync(r => r.Id == itemDto.RecipeId.Value);
                    if (recipe == null)
                    {
                        return BadRequest($"Recipe with ID {itemDto.RecipeId.Value} not found.");
                    }
                }

                if(itemDto.IngredientId.HasValue && itemDto.IngredientId.Value > 0)
                {
                    ingredient = await _context.Ingredients
                        .FirstOrDefaultAsync(i => i.Id == itemDto.IngredientId.Value && !i.IsDeleted);
                    if (ingredient == null)
                    {
                        return BadRequest($"Ingredient with ID {itemDto.IngredientId.Value} not found.");
                    }
                }

                meal.MealItems.Add(new MealItem
                {
                    Meal = meal,
                    RecipeId = recipe?.Id,
                    IngredientId = ingredient?.Id,
                    Recipe = recipe,
                    Ingredient = ingredient,
                    Amount = itemDto.Amount
                });
            }

            var result = new MealResponseDto
            {
                Id = meal.Id,
                MealName = meal.MealName,
                Items = meal.MealItems.Select(i => new MealItemResponseDto
                {
                    Id = i.Id,
                    RecipeId = i.RecipeId,
                    IngredientId = i.IngredientId,
                    Amount = i.Amount
                }).ToList()
            };

            _context.Meals.Add(meal);
            await _context.SaveChangesAsync();
            return Created($"api/meals/{meal.Id}", 
                new
                {
                    Message = "Meal created successfully",
                    Data = result
                });
        }
    }
}
