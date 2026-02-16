using System.ComponentModel.DataAnnotations.Schema;

namespace Vizsgaremek.Models
{
    public class UserActivity
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public int ActivityId { get; set; }
        public Activity Activity { get; set; }
        public decimal Duration { get; set; }
           
        [NotMapped]
        public decimal CaloriesBurned => (Activity.CaloriesBurnedPerHour * Duration) / 60m;
        public DateOnly Log { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    }
}
