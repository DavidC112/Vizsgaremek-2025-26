namespace Vizsgaremek.DTOs.Recipes
{
    public class RecipeResponseDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Category { get; set; }
        public int PreparationTime { get; set; }
        public int CookingTime { get; set; }
        public required string Description { get; set; }
        public string Instructions { get; set; }
        public int Portions { get; set; }
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Fat { get; set; }
        public bool IsVegan { get; set; }
        public bool IsVegetarian { get; set; }
        public bool IsCommunity { get; set; }
        public string? ImageUrl { get; set; }
        public ICollection<RecipeIngredientResponseDto> Ingredients { get; set; } =
            new List<RecipeIngredientResponseDto>();
        public bool IsDeleted { get; set; }
    }
}
