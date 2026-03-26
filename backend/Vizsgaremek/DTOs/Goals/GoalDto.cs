namespace Vizsgaremek.DTOs.Goal
{
    public record GoalDto
    {
        public decimal TargetWeight { get; set; }
        public DateOnly DeadLine { get; set; }
    }
}
