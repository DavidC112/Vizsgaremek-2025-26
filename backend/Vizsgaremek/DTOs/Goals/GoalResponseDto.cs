using Vizsgaremek.DTOs.Attributes;

namespace Vizsgaremek.DTOs.Goal
{
    public class GoalResponseDto
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public decimal TargetWeight { get; set; }
        public DateOnly TargetDate { get; set; }
    }
}
