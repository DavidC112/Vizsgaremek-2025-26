namespace Vizsgaremek.DTOs.Recipes
{
    public class UserRecipeDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int PreparationTime { get; set; }
        public int CookingTime { get; set; }
        public required string Description { get; set; }
        public int Portions { get; set; }
        public ICollection<RecipeIngredientResponseDto> Ingredients { get; set; } = new List<RecipeIngredientResponseDto>();
    }
}
