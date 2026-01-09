namespace Vizsgaremek.Models
{
    public class Goals
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public double TargetWeight { get; set; }
        public DateTime DeadLine { get; set; }
        public int Progress { get; set; } = 0;


    }
}
