using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs;
using Vizsgaremek.Models;
using Vizsgaremek.Services;

namespace Vizsgaremek.Controllers.Public
{
    [ApiController]
    [Route("api/users/me/attributes")]
    [Authorize]
    public class AttributeController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly CaloriesCalculationService _caloriesCalculationService;
        public AttributeController(HealthAppDbContext context, UserManager<User> userManager, CaloriesCalculationService caloriescalc)
        {
            _context = context;
            _userManager = userManager;
            _caloriesCalculationService = caloriescalc;
        }


        [HttpGet]
        public async Task<IActionResult> GetLoggedUserAttributes()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in attributes/");
            }
            
            var attributes = await _context.UserAttributes
                .Where(ua => ua.UserId == user.Id)
                .ToListAsync();
            
            if (!attributes.Any())
            {
                var defaultAttributes = new UserAttributes
                {
                    UserId = user.Id,
                    Weight = 60m,
                    Height = 170m,
                    MeasuredAt = DateOnly.FromDateTime(DateTime.UtcNow)
                };

                _context.UserAttributes.Add(defaultAttributes);
                await _context.SaveChangesAsync();

                attributes.Add(defaultAttributes);
            }

            var goalTypes = await _caloriesCalculationService.CalculateCalories(user);

            
            var result = attributes.Select(ua => new AttributesResponseDto
            {
                Id = ua.Id,
                Weight = ua.Weight,
                Height = ua.Height,
                Bmi = ua.Bmi,
                MeasuredAt = ua.MeasuredAt,
                Calories = goalTypes?.Calories,
                GoalType = goalTypes?.GoalType
            }).ToList();

            return Ok(new { Message = $"{user.FirstName} {user.LastName}'s attributes.", Data = result });
        }

        [HttpPost("add")]
        public async Task<IActionResult> CreateAttributes([FromBody] AttributesDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in attributes/add");
            }

            var userAttributes = new UserAttributes
            {
                User = user,
                UserId = user.Id,
                Weight = dto.Weight,
                Height = dto.Height,
                MeasuredAt = dto.MeasuredAt
            };
            
            var goalTypes = await _caloriesCalculationService.CalculateCalories(user);

            _context.UserAttributes.Add(userAttributes);
            await _context.SaveChangesAsync();

            var result = new AttributesResponseDto
            {
                Id = userAttributes.Id,
                Weight = userAttributes.Weight,
                Height = userAttributes.Height,
                Bmi = userAttributes.Bmi,
                MeasuredAt = userAttributes.MeasuredAt, 
                Calories = goalTypes?.Calories,
                GoalType = goalTypes?.GoalType
            };
            
            return Created("api/users/me/attributes",
                new
                {
                    Message = "Attributes created successfully",
                    Data = result
                }
            );
        }

    }
}
