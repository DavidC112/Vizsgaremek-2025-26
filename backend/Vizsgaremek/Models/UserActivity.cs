using System.ComponentModel.DataAnnotations.Schema;

namespace Vizsgaremek.Models
{
    public class UserActivity
    {
        public int Id { get; set; }
        public required string UserId { get; set; }
        public User? User { get; set; }
        public int ActivityId { get; set; }
        public required Activity Activity { get; set; }
        public decimal Duration { get; set; }

        [NotMapped]
        public decimal CaloriesBurned => Math.Round((Activity.CaloriesBurnedPerHour * Duration) / 60m, 2);
        public DateOnly Log { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    }
}
