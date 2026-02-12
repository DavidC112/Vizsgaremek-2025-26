using Vizsgaremek.DTOs;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.DTOs.Goal;
using Vizsgaremek.DTOs.Meal;
using Vizsgaremek.DTOs.Recipes;

public record class UserResponseDto
{
    public string Id { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? ProfilePictureUrl { get; set; }
    public string? ProfilePictureId { get; set; }
    public string? Role { get; set; }
    public ICollection<AttributesResponseDto>? UserAttributes { get; set; }
    public GoalResponseDto? UserGoal { get; set; }
    public ICollection<UserActivityResponseDto>? UserActivities { get; set; }
    public ICollection<UserRecipeDto>? UserRecipes { get; set; }
    public ICollection<MealResponseDto> Meals { get; set; }
}
