using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Recipes
{
    public class RecipeCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public required string Category { get; set; }
        public int PreparationTime { get; set; }
        public int CookingTime { get; set; }
        [Required]
        public required string Description { get; set; }
        public int Portions { get; set; }
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Fat { get; set; }
        public List<RecipeIngredientCreateDto> Ingredients { get; set; } = new();
    }
}
