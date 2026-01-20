namespace Vizsgaremek.Models
{
    public class Goal
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public decimal TargetWeight { get; set; }
        public DateTime DeadLine { get; set; }

    }
}
