using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Attributes
{
    public class UserDataResponseDto
    {
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}
