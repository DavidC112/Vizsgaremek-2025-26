using Vizsgaremek.Interface;

namespace Vizsgaremek.Models
{
    public class Recipe : IDeletable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
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
        public string ImageUrl { get; set; }
        public string FileId { get; set; }
        public bool IsCommunity { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<RecipeIngredient> RecipeIngredients { get; set; }
    }
}
