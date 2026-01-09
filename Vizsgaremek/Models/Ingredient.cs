namespace Vizsgaremek.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Calories { get; set; }
        public double Protein { get; set; }
        public double Carbohydrates { get; set; }
        public double Fats { get; set; }
        public ICollection<RecipeIngredient> RecipeIngredients { get; set; }
    }
}
