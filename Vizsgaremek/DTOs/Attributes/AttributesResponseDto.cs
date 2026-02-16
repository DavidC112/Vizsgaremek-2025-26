namespace Vizsgaremek.DTOs
{
    public class AttributesResponseDto
    {
        public int Id { get; set; }
        public decimal Weight { get; set; }
        public decimal Height { get; set; }
        public DateOnly MeasuredAt { get; set; }
        public string GoalType { get; set; } = "Maintain";
        public decimal Bmi { get; set; }
        public decimal Calories { get; set; }
    }
}
