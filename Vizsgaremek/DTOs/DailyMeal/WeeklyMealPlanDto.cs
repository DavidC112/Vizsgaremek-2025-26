namespace Vizsgaremek.DTOs.DailyMeal
{
    public class WeeklyMealPlanDto
    {
        public List<DailyMealPlanDto> DailyMeals { get; set; } = new List<DailyMealPlanDto>();
        public DateOnly ExpiryDate { get; set; }
    }
}
