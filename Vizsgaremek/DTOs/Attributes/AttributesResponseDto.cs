using Vizsgaremek.DTOs.Attributes;

namespace Vizsgaremek.DTOs
{
    public class AttributesResponseDto
    {
        public int Id { get; set; }
        public double Weight { get; set; }
        public double Height { get; set; }
        public DateTime MeasuredAt { get; set; }
        public double Bmi { get; set; }
        public AttributesUserResponseDto User { get; set; }

    }
}
