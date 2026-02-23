namespace Vizsgaremek.DTOs.Ingredients
{
    public class IngredienCreatetDto
    {
        public required string Name { get; set; }
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Fat { get; set; }
    }
}
