using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs
{
    public class RefreshDto
    {
        public required string RefreshToken { get; set; }
    }
}
