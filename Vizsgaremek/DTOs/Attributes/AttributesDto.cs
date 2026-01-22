using Vizsgaremek.Models;

namespace Vizsgaremek.DTOs
{
    public class AttributesDto
    {
        public decimal Weight { get; set; }
        public decimal Height { get; set; }
        public DateOnly MeasuredAt { get; set; }
    }
}
