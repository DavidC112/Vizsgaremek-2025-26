namespace Vizsgaremek.DTOs.Meal
{
    public class MealItemResponseDto
    {
        public int? Id { get; set; }
        public int? RecipeId { get; set; }
        public int? IngredientId { get; set; }
        public decimal Amount { get; set; }
    }
}
