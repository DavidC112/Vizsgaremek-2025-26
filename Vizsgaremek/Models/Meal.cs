using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Vizsgaremek.DTOs.Meal;

namespace Vizsgaremek.Models
{
    public class Meal
    {
        public int Id { get; set; }
        public required string Category { get; set; }
        public required string MealName { get; set; }
        public required string UserId { get; set; }
        public int? RecipeId { get; set; }
        public int? IngredientId { get; set; }
        public decimal Amount { get; set; }
        public Recipe? Recipe { get; set; }
        public Ingredient? Ingredient { get; set; }
        public User? User { get; set; }

        public DateOnly Log { get; set; } = DateOnly.FromDateTime(DateTime.Now);        public NutritionDto CalculateNutrition()
        {
            var source = (object?)Recipe ?? Ingredient;

            if (source == null)
                return new NutritionDto();

            return source switch
            {
                Recipe recipe => new NutritionDto
                {
                    Calories = recipe.Calories * Amount / 100m,
                    Protein = recipe.Protein * Amount / 100m,
                    Fat = recipe.Fat * Amount / 100m,
                    Carbohydrate = recipe.Carbohydrate * Amount / 100m
                },

                Ingredient ingredient => new NutritionDto
                {
                    Calories = ingredient.Calories * Amount / 100m,
                    Protein = ingredient.Protein * Amount / 100m,
                    Fat = ingredient.Fat * Amount / 100m,
                    Carbohydrate = ingredient.Carbohydrate * Amount / 100m
                },

                _ => new NutritionDto()
            };
        }
    }
}
