using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.Models
{
    public class DailyMealPlan
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public int WeeklyMealPlanId { get; set; }
        public WeeklyMealPlan? WeeklyMealPlan { get; set; }
        public int BreakfastRecipeId { get; set; }
        public int SoupRecipeId { get; set; }
        public int LunchRecipeId { get; set; }
        public int DinnerRecipeId { get; set; }
    }
}
