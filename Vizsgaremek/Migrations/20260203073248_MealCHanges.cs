using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vizsgaremek.Migrations
{
    /// <inheritdoc />
    public partial class MealCHanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MealName",
                table: "Meals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "MealItems",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MealName",
                table: "Meals");

            migrationBuilder.AlterColumn<int>(
                name: "Amount",
                table: "MealItems",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");
        }
    }
}
