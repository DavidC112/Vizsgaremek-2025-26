using Vizsgaremek.Models;

namespace Vizsgaremek.DTOs.Activity
{
    public class UserActivityDto
    {
        public decimal Duration { get; set; }
        public Models.Activity Activity { get; set; }
        public decimal CaloriesBurned => (Activity.CaloriesBurnedPerHour * Duration) / 60m;
        public string ActivityName { get; set; }
    }
}
