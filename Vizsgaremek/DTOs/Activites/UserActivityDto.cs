using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Activity
{
    public class UserActivityDto
    {
        public required string ActivityName { get; set; }
        public decimal Duration { get; set; }
    }
}
