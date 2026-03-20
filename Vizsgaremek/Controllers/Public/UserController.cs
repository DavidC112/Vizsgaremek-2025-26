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
    [Authorize]
    public class UserController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ImageKitService _imageKit;
        private readonly WeeklyMealService _weeklyMeal;
        private readonly DailyIntakeService _dailyIntakeService;
        private readonly CaloriesCalculationService _calculateCal;


        public UserController(HealthAppDbContext context, UserManager<User> userManager, ImageKitService imageKit,
            WeeklyMealService weeklyMeal, DailyIntakeService dailyIntakeService,
            CaloriesCalculationService calculateCal)
        {
            _context = context;
            _userManager = userManager;
            _imageKit = imageKit;
            _weeklyMeal = weeklyMeal;
            _dailyIntakeService = dailyIntakeService;
            _calculateCal = calculateCal;
        }


        [HttpGet]
        public async Task<IActionResult> GetLoggedUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized("User was not found in user/");

            var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
            var returnRecipes = new List<RecipeUserDto>();

            if (role == "Admin")
            {
                var recipes = _context.Recipes.Where(x => x.UserId == null).ToList();
                
                foreach (var r in recipes)
                {
                    returnRecipes.Add(new RecipeUserDto
                        {
                            Id = r.Id,
                            Name =  r.Name,
                            ImageUrl = r.ImageUrl,
                        }
                    );
                }
            }
            else
            {
                var recipes = _context.Recipes.Where(x => x.UserId == x.UserId).ToList();
                foreach (var r in recipes)
                {
                    returnRecipes.Add(new RecipeUserDto
                        {
                            Id = r.Id,
                            Name =  r.Name,
                            ImageUrl = r.ImageUrl,
                        }
                    );
                }
            }

            var response = new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                ProfilePictureUrl = user.ProfilePictureUrl,
                Role = role,
                IsDeleted = user.IsDeleted,
                BirthDate = user.BirthDate,
                Recipes = returnRecipes
            };

            return Ok(response);
        }

        [HttpPost("upload-picture")]
        public async Task<IActionResult> UploadProfilePicture(
            [FromForm] UploadImageDto dto)
        {
            if (dto.File == null || dto.File.Length == 0)
            {
                return BadRequest("No file selected");
            }

            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User was not found in user/uploadImage");
            }

            if (user.FileId != null)
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


            user.ProfilePictureUrl = "https://ik.imagekit.io/nrt5lwugy/pictures/default%20pfp.jpeg";
            user.FileId = "698593d45c7cd75eb822b00b";

            await _userManager.UpdateAsync(user);

            return Ok(new { Message = "Profile picture deleted successfully" });
        }

        [HttpPatch("delete-account")]
        public async Task<IActionResult> DeleteAccount()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound("User not found in user/delete");
            }
            if (await _userManager.IsInRoleAsync(user, "Admin"))
            {
                return StatusCode(418, "I'm a teapot!");
            }

            user.IsDeleted = true;
            await _userManager.UpdateAsync(user);

            return Ok(new { Message = "Account marked as deleted" });
        }


        [HttpGet("daily-intake")]
        public async Task<IActionResult> GetDaily()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in users/daily");
            }

            var result = await _dailyIntakeService.GetDailyIntake(user.Id);

            return Ok(result);
        }

        [HttpGet("weekly-meal-plan")]
        public async Task<IActionResult> GetWeeklyMealPlan()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized("User was not found in users/weekly-meal-plan");

            try
            {
                var result = await _weeklyMeal.GenerateDailyMeals(user);
                return Ok(new { Message = "Weekly meal plan has been generated", Data = result });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPatch("edit")]
        public async Task<IActionResult> EditUeser(UserEditDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in User/edit");
            }
            
            user.Email = dto.Email ?? user.Email;
            user.FirstName = dto.FirstName ?? user.FirstName;
            user.LastName = dto.LastName ?? user.LastName;
            user.BirthDate = dto.BirthDate ?? user.BirthDate;
            
            await _userManager.UpdateAsync(user);   
            
            
            return Ok(new { Message = "User edited successfully" });
        }
        
        [HttpPatch("change-password")]
        public async Task<IActionResult> ChangePassword(EditPasswordDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in User/change-password");
            }

            var result = await _userManager.ChangePasswordAsync(
                user,
                dto.CurrentPassword,    
                dto.NewPassword
            );

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            };
            return Ok(new { Message = "Password changed successfully" });
        }
    }
}