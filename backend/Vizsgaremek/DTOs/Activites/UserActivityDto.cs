using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Activity
{
    public class UserActivityDto
    {
        public int ActivityId { get; set; }
        public decimal Duration { get; set; }
    }
}
