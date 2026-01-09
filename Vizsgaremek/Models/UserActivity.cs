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
        public double Duration { get; set; }
        public DateTime ActivityDate { get; set; }
        [NotMapped]
        public double CaloriesBurned => (Activity.CaloriesBurnedPerHour * Duration) / 60.0;
    }
}
