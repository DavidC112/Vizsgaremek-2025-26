using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;



namespace Vizsgaremek.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly BirthDate { get; set; }
        
        [NotMapped]
        public int Age 
        { 
            get {
                    int age = DateTime.Now.Year - BirthDate.Year;
                    if (DateTime.Now.DayOfYear < BirthDate.DayOfYear)
                        age--;
                    return age;
                } 
        }
        public string Gender { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserAttributes? UserAttributes { get; set; } = null;
        public ICollection<UserActivity>? UserActivities { get; set; } = null;
        public UserGoal? UserGoals { get; set; } = null;
        public ICollection<Meal>? Meals { get; set; } = null;
        public ICollection<Recipe>? Recipes { get; set; } = null;
        public DailyTarget? DailyTarget { get; set; } = null;
        public ICollection<RefreshToken>? RefreshTokens { get; set; } = null;

    }
}

