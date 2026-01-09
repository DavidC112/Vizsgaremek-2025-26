namespace Vizsgaremek.Models
{
    public class MealItem
    {
        public int Id { get; set; }
        public int MealId { get; set; }
        public Meal Meal { get; set; }
        public int? RecipeId { get; set; }
        public Recipe? Recipe { get; set; }
        public int? IngredientId { get; set; }
        public Ingredient? Ingredient { get; set; }
        public int Amount { get; set; }
    }
}
