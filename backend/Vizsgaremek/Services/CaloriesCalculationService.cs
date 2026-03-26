using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Attributes;
using Vizsgaremek.Models;

namespace Vizsgaremek.Services
{
    public class CaloriesCalculationService
    {
        private readonly HealthAppDbContext _context;
        public CaloriesCalculationService(HealthAppDbContext context)
        {
            _context = context;     
        }

        public async Task<GoalTypeCaloriesDto> CalculateCalories(User user)
        {
            var userAttributes = await _context.UserAttributes
                .Where(ua => ua.UserId == user.Id)
                .OrderByDescending(ua => ua.MeasuredAt)
                .FirstOrDefaultAsync();

            var userGoal = await _context.UserGoals
                .Where(ug => ug.UserId == user.Id)
                .FirstOrDefaultAsync();

            if (userAttributes == null)
            {
                return null;
            }

            decimal weight = userAttributes.Weight;
            decimal height = userAttributes.Height;
            decimal target = userGoal?.TargetWeight ?? weight;

            int days = userGoal != null
                ? (userGoal.DeadLine.ToDateTime(TimeOnly.MinValue)
                   - DateTime.UtcNow.Date).Days : 0;

            bool isFemale = "female".Equals(user.Gender, StringComparison.OrdinalIgnoreCase);

            decimal bmr = isFemale
                ? weight * 10 + height * 6.25m - user.Age * 5 - 161
                : weight * 10 + height * 6.25m - user.Age * 5 + 5;

            if (days <= 0 || weight == target)
            {
                return new GoalTypeCaloriesDto
                {
                    Calories = Math.Round(bmr),
                    GoalType = "Maintain"
                };
            }

            decimal diff = Math.Abs(target - weight);
            decimal dailyChange = diff * 7700 / days;

            decimal calories = weight > target
                ? bmr - dailyChange
                : bmr + dailyChange;

            return new GoalTypeCaloriesDto
            {
                Calories = Math.Round(calories),
                GoalType = weight > target ? "Losing weight" : "Gaining weight"
            };
        }

    }
}
