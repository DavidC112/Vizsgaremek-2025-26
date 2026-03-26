using Vizsgaremek.Interface;
using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.Models
{
    public class Ingredient : IDeletable
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Fat { get; set; }
        public bool IsDeleted { get; set; } = false;

        public ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
    }
}
