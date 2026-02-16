namespace Vizsgaremek.Models
{
    public class DailyIntake
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public decimal Calories { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Protein { get; set; }
        public decimal Fat { get; set; }
        public DateOnly Date { get; set; }
    }
}
