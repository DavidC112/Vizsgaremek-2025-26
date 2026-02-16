namespace Vizsgaremek.Models
{
    public class DailyMealPlan
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public int WeeklyMealPlanId { get; set; }
        public WeeklyMealPlan WeeklyMealPlan { get; set; }
        public string Breakfast { get; set; }
        public int BreakfastRecipeId { get; set; }
        public string Soup { get; set; }
        public int SoupRecipeId { get; set; }
        public string Lunch { get; set; }
        public int LunchRecipeId { get; set; }
        public string Dinner { get; set; }
        public int DinnerRecipeId { get; set; }
    }
}
