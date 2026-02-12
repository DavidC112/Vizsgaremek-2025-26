namespace Vizsgaremek.DTOs
{
    public class AttributesResponseDto
    {
        public int Id { get; set; }
        public decimal Weight { get; set; }
        public decimal Height { get; set; }
        public DateOnly MeasuredAt { get; set; }
        public decimal Bmi { get; set; }
    }
}
