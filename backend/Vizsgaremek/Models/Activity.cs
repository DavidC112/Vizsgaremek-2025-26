using System.ComponentModel.DataAnnotations;
using Vizsgaremek.Interface;

namespace Vizsgaremek.Models
{
    public class Activity : IDeletable
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int CaloriesBurnedPerHour { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
