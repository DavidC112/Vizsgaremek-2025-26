using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Activity
{
    public class ActivityDto
    {
        [Required]
        public string Name { get; set; }
        public int CaloriesBurnedPerHour { get; set; }
    }
}
