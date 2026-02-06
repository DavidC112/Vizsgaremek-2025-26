using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vizsgaremek.Migrations
{
    /// <inheritdoc />
    public partial class RecipeImg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Carbohydrates",
                table: "DailyTargets");

            migrationBuilder.DropColumn(
                name: "Fats",
                table: "DailyTargets");

            migrationBuilder.DropColumn(
                name: "Protein",
                table: "DailyTargets");

            migrationBuilder.AddColumn<string>(
                name: "FileId",
                table: "Recipes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Recipes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileId",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Recipes");

            migrationBuilder.AddColumn<decimal>(
                name: "Carbohydrates",
                table: "DailyTargets",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Fats",
                table: "DailyTargets",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Protein",
                table: "DailyTargets",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
