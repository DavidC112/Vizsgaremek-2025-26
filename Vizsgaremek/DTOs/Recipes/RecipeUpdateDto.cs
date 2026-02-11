using Vizsgaremek.DTOs.Recipes;

public class RecipeUpdateDto
{
    public string? Name { get; set; } = null;
    public string? Category { get; set; } = null;
    public int? PreparationTime { get; set; } = null;
    public int? CookingTime { get; set; } = null;
    public string? Description { get; set; } = null;
    public int? Portions { get; set; } = null;
    public decimal? Calories { get; set; } = null;
    public decimal? Protein { get; set; } = null;
    public decimal? Carbohydrate { get; set; } = null;
    public decimal? Fat { get; set; } = null;
    public bool? IsVegan { get; set; } = false;
    public bool? IsVegetarian { get; set; } = false;
    public List<RecipeIngredientUpdateDto>? Ingredients { get; set; }
}
