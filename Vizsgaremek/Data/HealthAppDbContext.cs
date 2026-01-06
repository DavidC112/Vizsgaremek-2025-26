using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Vizsgaremek.Models;

namespace Vizsgaremek.Data
{   
    public class HealthAppDbContext : IdentityDbContext<User>
    {
        public HealthAppDbContext(DbContextOptions<HealthAppDbContext> options) : base(options)
        {
            
        }

        public DbSet<Models.User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
    }
}
