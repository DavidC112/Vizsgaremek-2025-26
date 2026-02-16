using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using Vizsgaremek.Interface;

namespace Vizsgaremek.Models
{
    public class User : IdentityUser, IDeletable
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public DateOnly BirthDate { get; set; }

        [NotMapped]
        public int Age { get { int age = DateTime.Now.Year - BirthDate.Year; if (DateTime.Now.DayOfYear < BirthDate.DayOfYear) age--; return age; } }
        public required string Gender { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
        public WeeklyMealPlan? WeeklyMealPlan { get; set; }
        public string? ProfilePictureUrl { get; set; } = "https://ik.imagekit.io/nrt5lwugy/pictures/default%20pfp.jpeg";
        public string? FileId { get; set; } = "698593d45c7cd75eb822b00b";

        public ICollection<UserAttributes> UserAttributes { get; set; } = new List<UserAttributes>();
        public ICollection<UserActivity> UserActivities { get; set; } = new List<UserActivity>();
        public UserGoal? UserGoals { get; set; }
        public ICollection<Meal> Meals { get; set; } = new List<Meal>();
        public ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
    }
}
