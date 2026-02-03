using Vizsgaremek.DTOs.Ingredients;
using Vizsgaremek.DTOs.Recipes;

namespace Vizsgaremek.DTOs.Meal
{
    public class MealResponseDto
    {
        public int Id { get; set; }
        public string MealName { get; set; }
        public ICollection<MealItemResponseDto> Items { get; set; }

    }
}
