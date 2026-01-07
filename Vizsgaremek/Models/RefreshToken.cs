namespace Vizsgaremek.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public DateTime Expiry{ get; set; }
        public string? TokenHash { get; set; }
    }
}
