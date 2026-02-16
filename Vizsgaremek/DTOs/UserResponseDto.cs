using Vizsgaremek.DTOs;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.DTOs.Goal;
using Vizsgaremek.DTOs.Meal;
using Vizsgaremek.DTOs.Recipes;

public record class UserResponseDto
{
    public required string Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public string? ProfilePictureUrl { get; set; }
    public string? ProfilePictureId { get; set; }
    public string? Role { get; set; }
    public ICollection<AttributesResponseDto>? UserAttributes { get; set; }
    public GoalResponseDto? UserGoal { get; set; }
    public ICollection<UserActivityResponseDto>? UserActivities { get; set; }
    public ICollection<UserRecipeDto>? UserRecipes { get; set; }
    public ICollection<MealResponseDto> Meals { get; set; }
}
