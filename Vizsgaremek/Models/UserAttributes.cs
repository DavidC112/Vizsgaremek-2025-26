using System.ComponentModel.DataAnnotations.Schema;

namespace Vizsgaremek.Models
{
    public class UserAttributes
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public double Weight { get; set; } 
        public double Height { get; set; }
        public DateTime MeasuredAt { get; set; }

        [NotMapped]
        public double Bmi => Math.Round(Weight / ((Height / 100) * (Height / 100)), 2);

    }
}
