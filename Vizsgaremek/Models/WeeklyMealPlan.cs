namespace Vizsgaremek.Models
{
    public class WeeklyMealPlan
    {
        public int Id { get; set; }
        public string userId { get; set; }
        public User user { get; set; }
        public List<DailyMealPlan> DailyMeals { get; set; } = new List<DailyMealPlan>();
        public DateOnly ExpiryDate { get; set; }
    }
}
