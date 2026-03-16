namespace Vizsgaremek.DTOs.User;

public class UserEditDto
{
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Password { get; set; }
    public DateOnly? BirthDate { get; set; }
}