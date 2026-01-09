using System.ComponentModel.DataAnnotations.Schema;

namespace Vizsgaremek.Models
{
    public class Meal
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }

        [NotMapped]

    }
}
