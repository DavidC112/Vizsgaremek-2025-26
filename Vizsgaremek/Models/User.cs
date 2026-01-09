    using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vizsgaremek.Models
{
    public class User : IdentityUser
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required DateOnly BirthDate { get; set; }

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
        public required string Gender { get; set; }
        public DateTime CreatedAt { get; set; }
        public int IsAdmin { get; set; }
        public UserAttributers? UserAttributers { get; set; } = null;
        public ICollection<UserActivity>? UserActivities { get; set; } = null;
        public ICollection<Goals>? Goals { get; set; } = null;
        public ICollection<Meal>? Meals { get; set; } = null;
        public ICollection<Recipe>? Recipes { get; set; } = null;
        public DailyTarget? DailyTarget { get; set; } = null;

    }
}

