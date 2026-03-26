using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vizsgaremek.Migrations
{
    /// <inheritdoc />
    public partial class RenamingIngredients : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Fats",
                table: "Recipes",
                newName: "Fat");

            migrationBuilder.RenameColumn(
                name: "Carbohydrates",
                table: "Recipes",
                newName: "Carbohydrate");

            migrationBuilder.RenameColumn(
                name: "Fats",
                table: "Ingredients",
                newName: "Fat");

            migrationBuilder.RenameColumn(
                name: "Carbohydrates",
                table: "Ingredients",
                newName: "Carbohydrate");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Ingredients",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Ingredients");

            migrationBuilder.RenameColumn(
                name: "Fat",
                table: "Recipes",
                newName: "Fats");

            migrationBuilder.RenameColumn(
                name: "Carbohydrate",
                table: "Recipes",
                newName: "Carbohydrates");

            migrationBuilder.RenameColumn(
                name: "Fat",
                table: "Ingredients",
                newName: "Fats");

            migrationBuilder.RenameColumn(
                name: "Carbohydrate",
                table: "Ingredients",
                newName: "Carbohydrates");
        }
    }
}
