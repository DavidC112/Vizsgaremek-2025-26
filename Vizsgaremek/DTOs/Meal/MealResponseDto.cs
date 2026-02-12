namespace Vizsgaremek.DTOs.Meal
{
    public class MealResponseDto
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string MealName { get; set; }
        public int? RecipeId { get; set; }
        public int? IngredientId { get; set; }
        public decimal Amount { get; set; }
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Fat { get; set; }
    }
}
