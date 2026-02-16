using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.DailyMeal;
using Vizsgaremek.Models;

namespace Vizsgaremek.Services
{
    public class DailyMealService
    {
        private readonly HealthAppDbContext _context;
        public DailyMealService(HealthAppDbContext context)
        {
            _context = context;
        }

        public async Task<WeeklyMealPlanDto> GenerateDailyMeals(User user)
        {
            var random = new Random();
            var today = new DateOnly(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
            var expiryDate = today.AddDays(6);
            var result = new List<DailyMealPlan>();

            var existingPlan = await _context.WeeklyMealPlans
                .Include(w => w.DailyMeals)
                .Where(w => w.userId == user.Id && w.ExpiryDate >= today)
                .OrderBy(w => w.ExpiryDate)
                .FirstOrDefaultAsync();
            if (existingPlan != null)
            {
                return MapToDto(existingPlan);
            }

            var breakfast = (await _context.Recipes
                .Where(r => r.Category == "Breakfast")
                .ToListAsync()).OrderBy(r => random.Next()).ToList();


            var soup = await _context.Recipes
                .Where(r => r.Category == "Soup").ToListAsync();

            var main = await _context.Recipes
                .Where(r => r.Category == "Main").ToListAsync();


            for (int i = 0; i < 7; i++)
            {
                var curretDate = today.AddDays(i);
                    
                var breakfastRecipe = breakfast[random.Next(breakfast.Count)];
                if (i > 0 && breakfast.Count > 1)
                {
                    while (breakfastRecipe.Id == result[i - 1].BreakfastRecipeId)
                    {
                        breakfastRecipe = breakfast[random.Next(breakfast.Count)];
                    }
                }

                var soupRecipe = soup[random.Next(soup.Count)];
                if(i > 0 && soup.Count > 1)
                {
                    while (soupRecipe.Id == result[i - 1].SoupRecipeId)
                    {
                        soupRecipe = soup[random.Next(soup.Count)];
                    }
                }
               

                var lunchRecipe = main[random.Next(main.Count)];
                if(i > 0 && main.Count > 1)
                {
                    while (lunchRecipe.Id == result[i - 1].LunchRecipeId || lunchRecipe.Id == result[i-1].DinnerRecipeId)
                    {
                        lunchRecipe = main[random.Next(main.Count)];
                    }
                }


                var dinnerRecipe = main[random.Next(main.Count)];
                if(i > 0 && main.Count > 1)
                {
                    while (dinnerRecipe.Id == result[i - 1].DinnerRecipeId || lunchRecipe.Id == dinnerRecipe.Id)
                    {
                        dinnerRecipe = main[random.Next(main.Count)];
                    }
            }

            result.Add(new DailyMealPlan
                {
                    Date = curretDate,
                    Breakfast = breakfastRecipe.Name,
                    BreakfastRecipeId = breakfastRecipe.Id,
                    Soup = soupRecipe.Name,
                    SoupRecipeId = soupRecipe.Id,
                    Lunch = lunchRecipe.Name,
                    LunchRecipeId = lunchRecipe.Id,
                    Dinner = dinnerRecipe.Name,
                    DinnerRecipeId = dinnerRecipe.Id
                });
            }

            var newplan = new WeeklyMealPlan
            {
                userId = user.Id,
                user = user,
                DailyMeals = result,
                ExpiryDate = expiryDate,
            };

            _context.WeeklyMealPlans.Add(newplan);
            await _context.SaveChangesAsync();  

            var response = MapToDto(newplan);

            return response;
        }

        private WeeklyMealPlanDto MapToDto(WeeklyMealPlan plan)
        {
            return new WeeklyMealPlanDto
            {
                DailyMeals = plan.DailyMeals
                    .Select(d => new DailyMealPlanDto
                    {
                        Date = d.Date,
                        Breakfast = d.Breakfast,
                        BreakfastRecipeId = d.BreakfastRecipeId,
                        Soup = d.Soup,
                        SoupRecipeId = d.SoupRecipeId,
                        Lunch = d.Lunch,
                        LunchRecipeId = d.LunchRecipeId,
                        Dinner = d.Dinner,
                        DinnerRecipeId = d.DinnerRecipeId
                    }).ToList(),
                ExpiryDate = plan.ExpiryDate
            };
        }


    }
}
