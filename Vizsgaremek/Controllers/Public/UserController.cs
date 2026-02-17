using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.DTOs.Goal;
using Vizsgaremek.DTOs.ImageDto;
using Vizsgaremek.DTOs.Meal;
using Vizsgaremek.DTOs.Recipes;
using Vizsgaremek.DTOs.User;
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
        private readonly DailyIntakeService _dailyIntakeService;
        private readonly CaloriesCalculationService _calculateCal;


        public UserController(HealthAppDbContext context, UserManager<User> userManager, ImageKitService imageKit, DailyMealService dailyMeal, DailyIntakeService dailyIntakeService, CaloriesCalculationService calculateCal)
        {
            _context = context;
            _userManager = userManager;
            _imageKit = imageKit;
            _dailyMeal = dailyMeal;
            _dailyIntakeService = dailyIntakeService;
            _calculateCal = calculateCal;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetLoggedUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in user/");
            }

            var goalTypes = await _calculateCal.CalculateCalories(user);
            var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();

            var u = await _context.Users
                .Include(u => u.UserAttributes)
                .Include(u => u.UserGoals)
                .Include(u => u.UserActivities)
                    .ThenInclude(ua => ua.Activity)
                .Include(u => u.Recipes)
                    .ThenInclude(r => r.RecipeIngredients)
                    .ThenInclude(ri => ri.Ingredient)
                .Include(u => u.Meals)
                        .ThenInclude(mi => mi.Recipe)
                            .ThenInclude(r => r.RecipeIngredients)
                            .ThenInclude(ri => ri.Ingredient)
                .Include(u => u.Meals)
                    .ThenInclude(i => i.Ingredient)
                .FirstOrDefaultAsync(u => u.Id == user.Id);


            var response = new UserResponseDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                ProfilePictureId = u.FileId,
                ProfilePictureUrl = u.ProfilePictureUrl,
                Role = role,

                UserAttributes = u.UserAttributes.Select(ua => new AttributesResponseDto
                {
                    Id = ua.Id,
                    Weight = ua.Weight,
                    Height = ua.Height,
                    Bmi = ua.Bmi,
                    MeasuredAt = ua.MeasuredAt,
                    Calories = goalTypes.Calories,
                    GoalType = goalTypes.GoalType
                }).ToList(),

                UserGoal = u.UserGoals == null ? null : new GoalResponseDto
                {
                    Id = u.UserGoals.Id,
                    TargetWeight = u.UserGoals.TargetWeight,
                    TargetDate = u.UserGoals.DeadLine
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

                    MealName = m.MealName,
                    Category = m.Category,
                    Id = m.Id,
                    RecipeId = m.RecipeId,
                    IngredientId = m.IngredientId,
                    Amount = m.Amount,
                    Calories = m.CalculateNutrition().Calories,
                    Protein = m.CalculateNutrition().Protein,
                    Carbohydrate = m.CalculateNutrition().Carbohydrate,
                    Fat = m.CalculateNutrition().Fat
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
            
            var  result = await _dailyIntakeService.GetDailyIntake(user.Id);

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

            var result = await _dailyMeal.GenerateDailyMeals(user);
            return Ok(new { Message = "Daily meal plan has been generated", Data = result});
        }

    }
}