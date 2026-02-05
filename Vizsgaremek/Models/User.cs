using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using Vizsgaremek.Interface;




namespace Vizsgaremek.Models
{
    public class User : IdentityUser, IDeletable
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
        public bool IsDeleted { get; set; } = false;

        public string? ProfilePictureUrl { get; set; } = null;
        public string? FileId { get; set; } = null;
        public UserAttributes? UserAttributes { get; set; } = null;
        public ICollection<UserActivity>? UserActivities { get; set; } = null;
        public UserGoal? UserGoals { get; set; } = null;
        public ICollection<Meal>? Meals { get; set; } = null;
        public ICollection<Recipe>? Recipes { get; set; } = null;
        public DailyTarget? DailyTarget { get; set; } = null;
        public ICollection<RefreshToken>? RefreshTokens { get; set; } = null;

    }
}

