using System.ComponentModel.DataAnnotations.Schema;

namespace Vizsgaremek.Models
{
    public class Meal
    {
        public int Id { get; set; }
        public string MealName { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public DateOnly Log { get; set; } = new DateOnly(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
        public ICollection<MealItem> MealItems { get; set; }

    }
}
