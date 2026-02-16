namespace Vizsgaremek.Models
{
    public class WeeklyMealPlan
    {
        public int Id { get; set; }
        public required string userId { get; set; }
        public User? user { get; set; }
        public ICollection<DailyMealPlan> DailyMeals { get; set; } = new List<DailyMealPlan>();
        public DateOnly ExpiryDate { get; set; }
    }
}
