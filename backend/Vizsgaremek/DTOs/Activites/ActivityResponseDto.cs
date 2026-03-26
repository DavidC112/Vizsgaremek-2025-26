namespace Vizsgaremek.DTOs.Activites
{
    public class ActivityResponseDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int CaloriesBurnedPerHour { get; set; }
        public bool IsDeleted { get; set; }
    }
}
