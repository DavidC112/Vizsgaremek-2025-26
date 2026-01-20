namespace Vizsgaremek.Models
{
    public class RecipeIngredient
    {
        public int IngredientId { get; set; }
        public Ingredient Ingredient { get; set; }
        public decimal Amount { get; set; }
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}
