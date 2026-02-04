namespace Vizsgaremek.DTOs.UserDto
{
    public class ProfilePictureDto
    {
        public string? FileId { get; set; }
        public IFormFile File { get; set; }
        public string? Url { get; set; }
    }
}
