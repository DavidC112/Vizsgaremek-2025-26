using System.ComponentModel.DataAnnotations.Schema;
namespace Vizsgaremek.Models
{
    public class UserAttributes
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public decimal Weight { get; set; }
        public decimal Height { get; set; }
        public DateOnly MeasuredAt { get; set; }

        [NotMapped]
        public decimal Bmi => Math.Round(Weight / ((Height / 100) * (Height / 100)), 2);

    }
}
