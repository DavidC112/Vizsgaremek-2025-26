using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.DTOs.DailyIntake;
using Vizsgaremek.DTOs.Goal;
using Vizsgaremek.DTOs.ImageDto;
using Vizsgaremek.DTOs.Meal;
using Vizsgaremek.DTOs.Recipes;
using Vizsgaremek.DTOs.UserDto;
using Vizsgaremek.Models;
using Vizsgaremek.Services;

namespace Vizsgaremek.Controllers.Public
{
    [ApiController]
    [Route("api/users/me")]
    public class UserController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ImageKitService _imageKit;
        private readonly DailyMealService _dailyMeal;


        public UserController(HealthAppDbContext context, UserManager<User> userManager, ImageKitService imageKit, DailyMealService dailyMeal)
        {
            _context = context;
            _userManager = userManager;
            _imageKit = imageKit;
            _dailyMeal = dailyMeal;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetLoggedUser()
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User was not found in user/");
            }

            var u = await _context.Users
                .Include(u => u.UserAttributes)
                .Include(u => u.UserGoals)
                .Include(u => u.UserActivities)
                    .ThenInclude(ua => ua.Activity)
                .Include(u => u.Recipes)
                    .ThenInclude(r => r.RecipeIngredients)
                    .ThenInclude(ri => ri.Ingredient)
                .Include(u => u.Meals)
                    .ThenInclude(m => m.MealItems)
                        .ThenInclude(mi => mi.Recipe)
                            .ThenInclude(r => r.RecipeIngredients)
                            .ThenInclude(ri => ri.Ingredient)
                .FirstOrDefaultAsync(u => u.Id == userId);

            var response = new UserResponseDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                ProfilePictureId = u.FileId,
                ProfilePictureUrl = u.ProfilePictureUrl,
                Role = _userManager.GetRolesAsync(u).Result.FirstOrDefault(),

                UserAttributes = u.UserAttributes == null ? null : new AttributesDto
                {
                    Weight = u.UserAttributes.Weight,
                    Height = u.UserAttributes.Height,
                    MeasuredAt = u.UserAttributes.MeasuredAt
                },

                UserGoal = u.UserGoals == null ? null : new GoalDto
                {
                    TargetWeight = u.UserGoals.TargetWeight,
                    DeadLine = u.UserGoals.DeadLine
                },

                UserActivities = u.UserActivities.Select(ua => new UserActivityResponseDto
                {
                    Id = ua.Id,
                    ActivityName = ua.Activity.Name,
                    Duration = ua.Duration,
                    CaloriesBurned = ua.CaloriesBurned
                }).ToList(),
                UserRecipes = u.Recipes.Select(r => new UserRecipeDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    PreparationTime = r.PreparationTime,
                    CookingTime = r.CookingTime,
                    Description = r.Description,
                    Portions = r.Portions,
                    Ingredients = r.RecipeIngredients.Select(ri => new RecipeIngredientResponseDto
                    {
                        IngredientId = ri.IngredientId,
                        IngredientName = ri.Ingredient.Name,
                        Amount = ri.Amount
                    }).ToList()
                }).ToList(),

                Meals = u.Meals.Select(m => new MealResponseDto
                {
                    Id = m.Id,
                    MealName = m.MealName,
                    Items = m.MealItems.Select(mi => new MealItemResponseDto
                    {
                        Id = mi.Id,
                        RecipeId = mi.RecipeId,
                        IngredientId = mi.IngredientId,
                    }).ToList()
                }).ToList()
            };

            return Ok(response);
        }

        [HttpPost("upload-picture")]
        [Authorize]
        public async Task<IActionResult> UploadProfilePicture(
        [FromForm] UploadImageDto dto)
        {
            if (dto.File == null || dto.File.Length == 0)
            {
                return BadRequest("No file selected");
            }

            var user = await _userManager.GetUserAsync(User);

            if(user == null)
            {
                return Unauthorized("User was not found in user/uploadImage");
            }

            if(user.FileId != null)
            {
                var deleteResult = await _imageKit.DeleteImage(user.FileId);

                if (!deleteResult)
                {
                    return StatusCode(500, "Failed to delete existing image from ImageKit");
                }
            }

            var imageUrl = await _imageKit.UploadImage(dto.File);


            user.ProfilePictureUrl = imageUrl.Url;
            user.FileId = imageUrl.FileId;
            await _userManager.UpdateAsync(user);


            var result = new ImageResponseDto
            {
                Url = imageUrl.Url,
                FileId = imageUrl.FileId
            };
            return Ok(new { Message = "Picture uploaded successfully.", Data = result });
        }

        [HttpDelete("delete-picture")]
        [Authorize]
        public async Task<IActionResult> DeleteProfilePicture()
        {
            var user = await _userManager.GetUserAsync(User);

            if (string.IsNullOrEmpty(user.FileId))
            {
                return BadRequest("No profile picture to delete");
            }

            var deleteResult = await _imageKit.DeleteImage(user.FileId);

            if (!deleteResult)
            {
                return StatusCode(500, "Failed to delete image from ImageKit");
            }


            user.ProfilePictureUrl = default;
            user.FileId = default;

            await _userManager.UpdateAsync(user);

            return Ok(new { Message = "Profile picture deleted successfully" });
        }

        [HttpPatch("delete-account")]
        [Authorize]
        public async Task<IActionResult> DeleteAccount()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound("User not found in user/delete");
            }
            user.IsDeleted = true;
            await _userManager.UpdateAsync(user);

            return Ok(new { Message = "Account marked as deleted" });
        }


        [HttpGet("daily-intake")]
        [Authorize]
        public async Task<IActionResult> GetDaily()
        {
            var user = await _userManager.GetUserAsync(User);
            if(user == null)
            {
                return Unauthorized("User was not found in users/daily");
            }
            

            var meals = await _context.Meals
                .Where(m => m.UserId == user.Id)
                .Include(m => m.MealItems)
                    .ThenInclude(mi => mi.Ingredient)
                .Include(m => m.MealItems)
                    .ThenInclude(mi => mi.Recipe)
                .ToListAsync();

            if (meals == null)
                return NotFound("No meals found in users/daily");

            var result = new List<DailyIntakeDto>();

            foreach (var dayGroup in meals.GroupBy(m => m.Log))
            {
                decimal calories = 0, carbs = 0, protein = 0, fat = 0;

                foreach (var meal in dayGroup)
                {
                    foreach (var item in meal.MealItems)
                    {
                        if (item.Ingredient != null)
                        {
                            calories += item.Ingredient.Calories * item.Amount;
                            carbs += item.Ingredient.Carbohydrate * item.Amount;
                            protein += item.Ingredient.Protein * item.Amount;
                            fat += item.Ingredient.Fat * item.Amount;
                        }
                        else if (item.Recipe != null)
                        {
                            calories += item.Recipe.Calories * item.Amount;
                            carbs += item.Recipe.Carbohydrate * item.Amount;
                            protein += item.Recipe.Protein * item.Amount;
                            fat += item.Recipe.Fat * item.Amount;
                        }
                    }
                }

                result.Add(new DailyIntakeDto
                {
                    Calories = calories,
                    Carbohydrate = carbs,
                    Protein = protein,
                    Fat = fat,
                    Date = dayGroup.Key
                });
            }

            return Ok(result);
        }

        [HttpGet("daily-meal-plan")]
        [Authorize]
        public async Task<IActionResult> GetWeeklyMealPlan()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in users/weekly-meal-plan");
            }

            var result = await _dailyMeal.GenerateDailyMeals();
            return Ok(new { Message = "Daily meal plan has been generated", Data = result});
        }

    }
}