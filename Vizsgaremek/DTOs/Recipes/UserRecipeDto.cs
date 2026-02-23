namespace Vizsgaremek.DTOs.Recipes;

public class UserRecipeDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Category { get; set; }
    public decimal Calories { get; set; }
    public decimal Protein { get; set; }
    public decimal Carbohydrate { get; set; }
    public decimal Fat { get; set; }
    public bool IsVegan { get; set; }
    public bool IsVegetarian { get; set; }
    public string? ImageUrl { get; set; }
}