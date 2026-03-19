using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vizsgaremek.Migrations
{
    /// <inheritdoc />
    public partial class DailyMealfix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Breakfast",
                table: "DailyMealPlans");

            migrationBuilder.DropColumn(
                name: "Dinner",
                table: "DailyMealPlans");

            migrationBuilder.DropColumn(
                name: "Lunch",
                table: "DailyMealPlans");

            migrationBuilder.DropColumn(
                name: "Soup",
                table: "DailyMealPlans");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Breakfast",
                table: "DailyMealPlans",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Dinner",
                table: "DailyMealPlans",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Lunch",
                table: "DailyMealPlans",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Soup",
                table: "DailyMealPlans",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
