using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Activity
    {
        public class UserActivityResponseDto
        {
           public int Id { get; set; }
            public string ActivityName { get; set; }
            public decimal Duration { get; set; }
            public decimal CaloriesBurned { get; set; }
        }
    }
