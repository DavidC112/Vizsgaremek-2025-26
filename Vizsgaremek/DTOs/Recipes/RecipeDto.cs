using System.ComponentModel.DataAnnotations;
using Vizsgaremek.DTOs.Ingredients;

namespace Vizsgaremek.DTOs.Recipes
{
    public class RecipeDto
    {
        [Required]
        public string Name { get; set; }
        public int PreparationTime { get; set; }
        public int CookingTime { get; set; }
        public int Portions { get; set; }
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Fat { get; set; }
        public bool IsCommunity { get; set; }
        public ICollection<IngredientDto> Ingredients { get; set; }
    }
}
