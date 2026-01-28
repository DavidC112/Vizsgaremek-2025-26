using Vizsgaremek.DTOs;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.DTOs.Goal;

public record class UserResponseDto
{
    public string Id { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public AttributesDto? UserAttributes { get; set; }
    public GoalDto? UserGoal { get; set; }
    public ICollection<UserActivityResponseDto>? UserActivities { get; set; }
}
