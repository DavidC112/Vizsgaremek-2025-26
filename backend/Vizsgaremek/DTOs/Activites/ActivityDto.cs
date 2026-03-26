using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Activity
{
    public class ActivityDto
    {
        public required string Name { get; set; }
        public int CaloriesBurnedPerHour { get; set; }
    }
}
