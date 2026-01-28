using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs
{
    public class RefreshDto
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}
