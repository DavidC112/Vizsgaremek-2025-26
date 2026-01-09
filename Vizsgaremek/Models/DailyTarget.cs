namespace Vizsgaremek.Models
{
    public class DailyTarget
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public double Calories { get; set; }
        public double Protein { get; set; }
        public double Carbohydrates { get; set; }
        public double Fats { get; set; }
        public DateOnly Date { get; set; }
}
}
