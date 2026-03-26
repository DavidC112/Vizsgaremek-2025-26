namespace Vizsgaremek.DTOs.DailyMeal 
{ 
    public class DailyMealPlanDto
    {
        public DateOnly Date { get; set; }
        public required string Breakfast { get; set; }
        public int BreakfastRecipeId { get; set; }
        public required string Soup { get; set; }
        public int SoupRecipeId { get; set; }
        public required string Lunch { get; set; }
        public int LunchRecipeId { get; set; }
        public required string Dinner { get; set; }
        public int DinnerRecipeId { get; set; }
    }

}
