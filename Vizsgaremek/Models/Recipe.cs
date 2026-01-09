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
        public int Portions { get; set; }
        public double Calories { get; set; }
        public double Protein { get; set; }
        public double Carbohydrates { get; set; }
        public double Fats { get; set; }
        public bool IsCommunity { get; set; }
        public ICollection<RecipeIngredient> RecipeIngredients { get; set; }
    }
}
