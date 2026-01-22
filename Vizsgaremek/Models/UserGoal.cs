namespace Vizsgaremek.Models
{
    public class UserGoal
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public decimal TargetWeight { get; set; }
        public DateOnly DeadLine { get; set; }

    }
}
