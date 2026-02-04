using Imagekit.Sdk;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.DTOs.Goal;
using Vizsgaremek.DTOs.Recipes;
using Vizsgaremek.DTOs.UserDto;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers.Public
{
    [ApiController]
    [Route("api/users")]
    public class UserController : Controller
    {
        private HealthAppDbContext _context;
        private UserManager<User> _userManager;
        private ImageKitService _imageKit;

        public UserController(HealthAppDbContext context, UserManager<User> userManager, ImageKitService imageKit)
        {
            _context = context;
            _userManager = userManager;
            _imageKit = imageKit;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .Include(u => u.UserAttributes)
                .Include(u => u.UserGoals)
                .Include(u => u.UserActivities)
                    .ThenInclude(ua => ua.Activity)
                .Include(u => u.Recipes)
                    .ThenInclude(r => r.RecipeIngredients)
                    .ThenInclude(ri => ri.Ingredient)
                .Select(u => new UserResponseDto
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,

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
                        ActivityName = ua.Activity.Name,
                        Duration = ua.Duration,
                        CaloriesBurned = ua.CaloriesBurned
                    }).ToList(),
                    UserRecipes = u.Recipes.Select(r => new UserRecipeDto
                    {
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
                    }).ToList()
                })
                .ToListAsync();

            return Ok(users);
        }


        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetLoggedUser()
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _context.Users
            .Include(u => u.UserAttributes)
            .Include(u => u.UserGoals)
            .Include(u => u.UserActivities)
            .ThenInclude(ua => ua.Activity)
            .FirstOrDefaultAsync(u => u.Id == userId);

            var response = new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserAttributes = user.UserAttributes == null ? null : new AttributesDto
                {
                    Weight = user.UserAttributes.Weight,
                    Height = user.UserAttributes.Height,
                    MeasuredAt = user.UserAttributes.MeasuredAt
                },
                UserGoal = user.UserGoals == null ? null : new GoalDto
                {
                    TargetWeight = user.UserGoals.TargetWeight,
                    DeadLine = user.UserGoals.DeadLine
                },
                UserActivities = user.UserActivities.Select(ua => new UserActivityResponseDto
                {
                    ActivityName = ua.Activity.Name,
                    Duration = ua.Duration,
                    CaloriesBurned = ua.CaloriesBurned
                }).ToList()
            };

            return Ok(response);
        }

        [HttpPost("upload-picture")]
        [Authorize]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadProfilePicture(
        [FromForm] UploadPictureDto dto)
        {
            if (dto.File == null || dto.File.Length == 0)
                return BadRequest("No file selected");

            var imageUrl = await _imageKit.UploadImage(dto.File);

            var user = await _userManager.GetUserAsync(User);
            user.ProfilePictureUrl = imageUrl.Url;
            await _userManager.UpdateAsync(user);


            var result = new ProfilePictureDto
            {
                Url = imageUrl.Url
            };
            return Ok(result);
        }
    }
}