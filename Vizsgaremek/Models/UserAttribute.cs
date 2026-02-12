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
        public decimal Bmi => Math.Round(Weight / ((Height / 100m) * (Height / 100m)), 2);

        [NotMapped]
        public decimal Bmr => CalculateCalories();

        private decimal CalculateCalories()
        {
            if (User == null) return 0;

            decimal bmr = 0;
            string gender = User.Gender?.ToLower();
            int age = User.Age;

            if (gender == "female")
            {
                bmr = Weight * 10 + Height * 6.25m - age * 5 - 161;
            }
            else if (gender == "male")
            {
                bmr = Weight * 10 + Height * 6.25m - age * 5 + 5;
            }

            return bmr;
        }
    }
}
