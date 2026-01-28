namespace Vizsgaremek.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? UserId { get; set; }
        public User? User { get; set; }
        public int PreparationTime { get; set; }
        public int CookingTime { get; set; }
        public string Description { get; set; }
        public int Portions { get; set; }
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Fat { get; set; }
        public bool IsCommunity { get; set; }
        public ICollection<RecipeIngredient> RecipeIngredients { get; set; }
    }
}
