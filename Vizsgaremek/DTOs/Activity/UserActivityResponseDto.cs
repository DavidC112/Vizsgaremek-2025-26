    namespace Vizsgaremek.DTOs.Activity
    {
        public class UserActivityResponseDto
        {
            public required string ActivityName { get; set; }
            public required decimal Duration { get; set; }
            public required decimal CaloriesBurned { get; set; }
        }
    }
