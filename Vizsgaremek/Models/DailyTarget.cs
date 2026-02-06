namespace Vizsgaremek.Models
{
    public class DailyTarget
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public decimal Calories { get; set; }
        public DateOnly Date { get; set; }
    }
}
