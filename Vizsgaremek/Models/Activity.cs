namespace Vizsgaremek.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CaloriesBurnedPerHour { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
