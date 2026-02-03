using System.ComponentModel.DataAnnotations;

namespace Vizsgaremek.DTOs.Meal
{
    public class MealCreateDto
    {
        [Required]
        public string MealName { get; set; }
        public List<MealItemCreateDto> Items { get; set; }
    }
}
