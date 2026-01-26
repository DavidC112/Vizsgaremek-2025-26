namespace Vizsgaremek.DTOs.Ingredients
{
    public class IngredientDto
    {
        public required string Name { get; set; }
        public required decimal Calories { get; set; }
        public required decimal Protein { get; set; }
        public required decimal Carbohydrates { get; set; }
        public required decimal Fats { get; set; }
    }
}
