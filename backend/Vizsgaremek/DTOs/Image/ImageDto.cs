namespace Vizsgaremek.DTOs.UserDto
{
    public class ImageDto
    {
        
        public required string FileId { get; set; }
        public required IFormFile File { get; set; }
        public required string Url { get; set; }
    }
}
