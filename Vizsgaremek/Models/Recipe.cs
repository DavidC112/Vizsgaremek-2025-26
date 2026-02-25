using Vizsgaremek.Interface;
using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.Models
{
    public class Recipe : IDeletable
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Category { get; set; }
        public string? UserId { get; set; }
        public User? User { get; set; }
        public int PreparationTime { get; set; }
        public int CookingTime { get; set; }
        public required string Description { get; set; }
        public required string Instructions { get; set; }
        public int Portions { get; set; }
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Fat { get; set; }
        public string? ImageUrl { get; set; } = "https://ik.imagekit.io/nrt5lwugy/pictures/def_Recipe.png";
        public string? FileId { get; set; } = "699de8445c7cd75eb8c1a51a";
        public bool IsCommunity { get; set; }
        public bool IsVegan { get; set; } = false;
        public bool IsVegetarian { get; set; } = false;
        public bool IsDeleted { get; set; } = false;

        public required ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
    }
}
