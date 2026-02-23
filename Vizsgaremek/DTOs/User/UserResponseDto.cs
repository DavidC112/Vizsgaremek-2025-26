using Vizsgaremek.DTOs.Recipes;

namespace Vizsgaremek.DTOs.User;

public class UserResponseDto
{
    public required string Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public string? ProfilePictureUrl { get; set; }
    public string? Role { get; set; }
    public bool IsDeleted { get; set; }
    public ICollection<UserRecipeDto> Recipes { get; set; } = new List<UserRecipeDto>();
}