using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Vizsgaremek.Interface;
using Vizsgaremek.Models;

namespace Vizsgaremek.Data
{   
    public class HealthAppDbContext : IdentityDbContext<User>
    {
        public HealthAppDbContext(DbContextOptions<HealthAppDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<RecipeIngredient>().HasKey(ri => new { ri.RecipeId, ri.IngredientId });
            builder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Recipe)
                .WithMany(r => r.RecipeIngredients)
                .HasForeignKey(ri => ri.RecipeId);

            builder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Ingredient)
                .WithMany(r => r.RecipeIngredients)
                .HasForeignKey(ri => ri.IngredientId);

            builder.Entity<UserAttributes>()
                .HasOne(ua => ua.User)
                .WithOne(u => u.UserAttributes) 
                .HasForeignKey<UserAttributes>(ua => ua.UserId);

            foreach(var entityType in builder.Model.GetEntityTypes())
            {
                if(typeof(IDeletable).IsAssignableFrom(entityType.ClrType))
                {
                    var parameter = Expression.Parameter(entityType.ClrType, "e");
                    var isDeletedProperty = Expression.Call(
                        typeof(EF), nameof(EF.Property), new[] { typeof(bool) },
                        parameter,
                        Expression.Constant("IsDeleted")
                    );
                    var compareExpression = Expression.Equal(isDeletedProperty, Expression.Constant(false));
                    var lambda = Expression.Lambda(compareExpression, parameter);

                    builder.Entity(entityType.ClrType).HasQueryFilter(lambda);
                }
            }

        }

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
        public DbSet<UserAttributes> UserAttributes { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<UserGoal> UserGoals { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<MealItem> MealItems { get; set; }

        }
}
