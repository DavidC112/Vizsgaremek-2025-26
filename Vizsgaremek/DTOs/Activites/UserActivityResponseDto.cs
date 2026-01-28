using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Activity
    {
        public class UserActivityResponseDto
        {
            [Required]
            public string ActivityName { get; set; }
            public decimal Duration { get; set; }
            public decimal CaloriesBurned { get; set; }
        }
    }
