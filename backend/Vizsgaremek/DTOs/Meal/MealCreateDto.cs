using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Meal
{
    public class MealCreateDto
    {
        public required string Category { get; set; }
        public int? RecipeId { get; set; }
        public int? IngredientId { get; set; }
        public decimal Amount { get; set; }
    }
}
