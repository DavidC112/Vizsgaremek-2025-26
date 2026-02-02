namespace Vizsgaremek.DTOs.Recipes
{
    public class UserRecipeDto
    {
        public string Name { get; set; }
        public int PreparationTime { get; set; }
        public int CookingTime { get; set; }
        public string Description { get; set; }
        public int Portions { get; set; }
        public List<RecipeIngredientResponseDto> Ingredients { get; set; }
    }
}
