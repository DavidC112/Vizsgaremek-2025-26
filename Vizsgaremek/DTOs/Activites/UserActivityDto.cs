using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Activity
{
    public class UserActivityDto
    {
        [Required]
        public string ActivityName { get; set; }
        public decimal Duration { get; set; }
    }
}
