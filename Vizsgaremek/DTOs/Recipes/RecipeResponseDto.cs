namespace Vizsgaremek.DTOs.Recipes
{
    public class RecipeResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PreparationTime { get; set; }
        public int CookingTime { get; set; }
        public string Description { get; set; }
        public int Portions { get; set; }

        public bool IsCommunity { get; set; }
        public List<RecipeIngredientResponseDto> Ingredients { get; set; }
    }
}
