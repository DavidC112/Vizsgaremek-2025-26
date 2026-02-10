namespace Vizsgaremek.DTOs.Ingredients
{
    public class IngredientResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Fat { get; set; }
    }
}
