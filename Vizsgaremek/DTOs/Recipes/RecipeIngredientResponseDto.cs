namespace Vizsgaremek.DTOs.Recipes
{
    public class RecipeIngredientResponseDto
    {
        public int IngredientId { get; set; }
        public required string IngredientName { get; set; }
        public decimal Amount { get; set; }
    }
}
