using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vizsgaremek.Migrations
{
    /// <inheritdoc />
    public partial class Generatemealfixes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WeeklyMealPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    userId = table.Column<string>(type: "TEXT", nullable: false),
                    ExpiryDate = table.Column<DateOnly>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeeklyMealPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeeklyMealPlans_AspNetUsers_userId",
                        column: x => x.userId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DailyMealPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    WeeklyMealPlanId = table.Column<int>(type: "INTEGER", nullable: false),
                    Breakfast = table.Column<string>(type: "TEXT", nullable: false),
                    BreakfastRecipeId = table.Column<int>(type: "INTEGER", nullable: false),
                    Soup = table.Column<string>(type: "TEXT", nullable: false),
                    SoupRecipeId = table.Column<int>(type: "INTEGER", nullable: false),
                    Lunch = table.Column<string>(type: "TEXT", nullable: false),
                    LunchRecipeId = table.Column<int>(type: "INTEGER", nullable: false),
                    Dinner = table.Column<string>(type: "TEXT", nullable: false),
                    DinnerRecipeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyMealPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DailyMealPlans_WeeklyMealPlans_WeeklyMealPlanId",
                        column: x => x.WeeklyMealPlanId,
                        principalTable: "WeeklyMealPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DailyMealPlans_WeeklyMealPlanId",
                table: "DailyMealPlans",
                column: "WeeklyMealPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_WeeklyMealPlans_userId",
                table: "WeeklyMealPlans",
                column: "userId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DailyMealPlans");

            migrationBuilder.DropTable(
                name: "WeeklyMealPlans");
        }
    }
}
