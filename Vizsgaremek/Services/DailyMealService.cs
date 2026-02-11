using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.DailyMeal;

namespace Vizsgaremek.Services
{
    public class DailyMealService
    {
        private readonly HealthAppDbContext _context;
        public DailyMealService(HealthAppDbContext context)
        {
            _context = context;
        }

        public async Task<WeeklyMealPlanDto> GenerateDailyMeals()
        {
            var random = new Random();
            var today = new DateOnly(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
            var expiryDate = today.AddDays(6);
            var result = new List<DailyMealPlanDto>();

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

            result.Add(new DailyMealPlanDto
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

            var response = new WeeklyMealPlanDto
            {
                DailyMeals = result,
                ExpiryDate = expiryDate
            };



            return response;
        }
    }
}
