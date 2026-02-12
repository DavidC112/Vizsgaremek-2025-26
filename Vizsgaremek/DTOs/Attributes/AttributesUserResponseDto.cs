using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Attributes
{
    public class UserDataResponseDto
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
    }
}
