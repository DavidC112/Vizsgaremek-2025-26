using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.DTOs.Goal;
using Vizsgaremek.DTOs.Meal;
using Vizsgaremek.DTOs.Recipes;
using Vizsgaremek.DTOs.User;
using Vizsgaremek.Models;
using Vizsgaremek.Services;


namespace Vizsgaremek.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/users")]
    [Authorize(Roles = "Admin")]
    public class UserAdminController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly HealthAppDbContext _context;
        public UserAdminController(UserManager<User> userManager, HealthAppDbContext contex, CaloriesCalculationService caloriesCalc)
        {
            _userManager = userManager;
            _context = contex;
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
                .Include(u => u.Meals)
                    .ThenInclude(mi => mi.Recipe)
                        .ThenInclude(r => r.RecipeIngredients)
                        .ThenInclude(ri => ri.Ingredient)
                .Include(u => u.Meals)
                    .ThenInclude(i => i.Ingredient)
                .ToListAsync();

            var rolesDictionary = new Dictionary<string, string>();

            foreach (var u in users)
            {
                var roles = await _userManager.GetRolesAsync(u); 
                rolesDictionary[u.Id] = roles.FirstOrDefault(); 
            }

            var result = users.Select(u => new UserResponseDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                ProfilePictureId = u.FileId,
                ProfilePictureUrl = u.ProfilePictureUrl,
                Role = rolesDictionary.ContainsKey(u.Id) ? rolesDictionary[u.Id] : null,

                UserAttributes = u.UserAttributes.Select(ua => new AttributesResponseDto
                {
                    Id = ua.Id,
                    Weight = ua.Weight,
                    Height = ua.Height,
                    Bmi = ua.Bmi,
                    MeasuredAt = ua.MeasuredAt
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
                    Fat = m.CalculateNutrition().Fat,
                    Carbohydrate = m.CalculateNutrition().Carbohydrate
                }).ToList()
            }).ToList();



            return Ok(new {Message = "All users.", Data = result});
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] string? email, [FromQuery] bool showDeleted = false)
        {
            var query = _context.Users.AsQueryable();

            if (showDeleted)
                query = query.IgnoreQueryFilters();

            if (!string.IsNullOrEmpty(email))
                query = query.Where(u => u.Email.Contains(email));

            var result = await query.ToListAsync();
            return Ok(new {Message = "Search users", Data = result});
        }



        [HttpPatch("{id}/delete-user")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound("User was not found in userAdmin/delete");
            }

            var loggedInUserId = _userManager.GetUserId(User);
            if (user.Id == loggedInUserId)
            {
                return StatusCode(418, "I'm a teapot!");
            }
            

            user.UserName = "deleted_user";
            user.IsDeleted = true;

            await _userManager.UpdateAsync(user);


            return Ok(new { Message = "User deleted successfully by admin" });
        }

        [HttpPatch("{id}/restore-user")]
        public async Task<IActionResult> RestoreUser(string id)
        {
            var user = await _context.Users
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound("Deleted User was not found in userAdmin/restore");
            }

            user.UserName = user.Email;
            user.IsDeleted = false;

            await _userManager.UpdateAsync(user);

            return Ok(new { Message = "User successfully restored by admin" });
        }

    }
}