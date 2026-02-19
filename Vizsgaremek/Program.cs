using Imagekit.Sdk;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;    
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Vizsgaremek.Data;
using Vizsgaremek.Models;
using Vizsgaremek.Services;


namespace Vizsgaremek
{
    public class Program
    {

        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Local", policy =>
                {
                    policy.WithOrigins("https://localhost:5173", "http://localhost:5173")
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials();
                });
            });

            


            builder.Services.AddDbContext<HealthAppDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("HealthCare")));

            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "HealthApp API",
                    Version = "v1"
                });

                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme.\r\n" +
                      "Enter 'Bearer' [space] and then your token.\r\n" +
                      "Example: \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",          
                    BearerFormat = "JWT"
                });

                options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
                {
                    [new OpenApiSecuritySchemeReference("Bearer", document)] = []
                });

            });


            builder.Services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<HealthAppDbContext>().AddDefaultTokenProviders();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.MapInboundClaims = false; 

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                    RoleClaimType = ClaimTypes.Role
                };
            });

            builder.Services.Configure<IdentityOptions>(options =>
            {
                options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
            });

            builder.Services.AddSingleton(new ImagekitClient(
                publicKey: builder.Configuration["ImageKit:PublicKey"],
                privateKey: builder.Configuration["ImageKit:PrivateKey"],
                urlEndPoint: builder.Configuration["ImageKit:UrlEndpoint"]
                ));
            builder.Services.AddScoped<ImageKitService>();
            builder.Services.AddScoped<DailyMealService>();
            builder.Services.AddScoped<DailyIntakeService>();
            builder.Services.AddScoped<CaloriesCalculationService>();
            builder.Services.AddScoped<TokenService>();  


            builder.Services.AddHttpClient();
            builder.Services.AddControllers();
            builder.Services.AddOpenApi();

            var app = builder.Build();


            using (var scope = app.Services.CreateScope())
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();


                var roles = new[] { "User", "Admin" };
                foreach (var role in roles)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                        await roleManager.CreateAsync(new IdentityRole(role));
                }
                
                string adminEmail = "systemadmin@healthcare.com";
                string adminPassword = "Admin@1234";

                var adminUser = await userManager.FindByEmailAsync(adminEmail);

                if (adminUser == null)
                {
                    adminUser = new User
                    {
                        FirstName = "Admin",
                        LastName = "Admin",
                        Email = adminEmail,
                        UserName = adminEmail,
                        BirthDate = new DateOnly(2000, 1, 1),
                        Gender = "male",
                        CreatedAt = DateTime.UtcNow
                    };

                    var createResult = await userManager.CreateAsync(adminUser, adminPassword);

                    if (!createResult.Succeeded)
                    {
                        foreach (var error in createResult.Errors)
                        {
                            Console.WriteLine("Admin creation error: " + error.Description);
                        }
                    }
                    else
                    {
                        await userManager.AddToRoleAsync(adminUser, "Admin");
                        Console.WriteLine("Admin created successfully");
                    }
                }
            }


            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("Local");
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
