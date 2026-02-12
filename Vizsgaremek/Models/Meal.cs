using System.ComponentModel.DataAnnotations.Schema;

namespace Vizsgaremek.Models
{
    public class Meal
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string MealName { get; set; }
        public string UserId { get; set; }
        public int? RecipeId { get; set; }
        public int? IngredientId { get; set; }
        public decimal Amount { get; set; }
        public Recipe? Recipe { get; set; }
        public Ingredient? Ingredient { get; set; }  
        public User User { get; set; }
        public DateOnly Log { get; set; } = DateOnly.FromDateTime(DateTime.Now);

    }
}
