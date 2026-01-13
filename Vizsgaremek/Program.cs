using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;    
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Security.Claims;
using System.Text;
using Vizsgaremek.Data;
using Vizsgaremek.Models;


namespace Vizsgaremek
{
    public class Program
    {

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Local", policy =>
                {
                    policy.WithOrigins("https://localhost:173", "http://localhost:5173")
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
                options.MapInboundClaims = false; // 🔴 REQUIRED

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                };
            });

            builder.Services.Configure<IdentityOptions>(options =>
            {
                options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
            });

            builder.Services.AddControllers();
            builder.Services.AddOpenApi();

            var app = builder.Build();
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
