using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.DailyIntake;
namespace Vizsgaremek.Services
{
    public class DailyIntakeService
    {

        private readonly HealthAppDbContext _context;

        public DailyIntakeService(HealthAppDbContext context)
        {
            _context = context;
        }

        public async Task<List<DailyIntakeDto>> GetDailyIntake(string userId)
        {
            var cutoff = DateOnly.FromDateTime(DateTime.Now.AddDays(-30));

            var meals = await _context.Meals
                .Where(m => m.UserId == userId && m.Log >= cutoff)
                .Include(m => m.Ingredient)
                .Include(m => m.Recipe)
                .ToListAsync();

            var result = new List<DailyIntakeDto>();

            foreach (var dayGroup in meals.GroupBy(m => m.Log))
            {
                decimal calories = 0, carbs = 0, protein = 0, fat = 0;

                foreach (var meal in dayGroup)
                {
                    var nutrition = meal.CalculateNutrition();

                    calories += nutrition.Calories;
                    carbs += nutrition.Carbohydrate;
                    protein += nutrition.Protein;
                    fat += nutrition.Fat;
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

            return result;
        }

    }
}
