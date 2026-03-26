using Vizsgaremek.Models;

namespace Vizsgaremek.DTOs.DailyIntake
{
    public class DailyIntakeDto
    {
        public decimal Calories { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Protein { get; set; }
        public decimal Fat { get; set; }
        public List<int> RecipeIds { get; set; } = [];
        public List<int> IngredientIds { get; set; } = [];
        public DateOnly Date { get; set; }
    }
}