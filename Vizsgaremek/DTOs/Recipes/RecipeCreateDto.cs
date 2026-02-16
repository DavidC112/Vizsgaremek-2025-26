using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Recipes
{
    public class RecipeCreateDto
    {
        public required string Name { get; set; }
        public required string Category { get; set; }
        public int PreparationTime { get; set; }
        public int CookingTime { get; set; }
        public required string Description { get; set; }
        public int Portions { get; set; }
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Fat { get; set; }
        public bool IsVegan { get; set; } = false;
        public bool IsVegetarian { get; set; } = false;
        public ICollection<RecipeIngredientCreateDto> Ingredients { get; set; } = new List<RecipeIngredientCreateDto>();
    }
}
