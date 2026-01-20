using Vizsgaremek.DTOs;
using Vizsgaremek.DTOs.Attributes;
using Vizsgaremek.DTOs.Goal;

public class UserResponseDto
{
    public string Id { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public AttributesDto? UserAttributes { get; set; }
    public GoalDto? UserGoal { get; set; }
}
