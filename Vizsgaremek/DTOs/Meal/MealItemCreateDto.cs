using Vizsgaremek.Models;

namespace Vizsgaremek.DTOs.Meal
{
    public class MealItemCreateDto
    {
        public int? Id { get; set; }
        public int? RecipeId { get; set; }
        public int? IngredientId { get; set; }
        public decimal Amount { get; set; }
    }
}
