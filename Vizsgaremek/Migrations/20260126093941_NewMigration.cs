using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vizsgaremek.Migrations
{
    /// <inheritdoc />
    public partial class NewMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_AspNetUsers_UserId",
                table: "Goals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Goals",
                table: "Goals");

            migrationBuilder.RenameTable(
                name: "Goals",
                newName: "UserGoals");

            migrationBuilder.RenameIndex(
                name: "IX_Goals_UserId",
                table: "UserGoals",
                newName: "IX_UserGoals_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserGoals",
                table: "UserGoals",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserGoals_AspNetUsers_UserId",
                table: "UserGoals",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGoals_AspNetUsers_UserId",
                table: "UserGoals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserGoals",
                table: "UserGoals");

            migrationBuilder.RenameTable(
                name: "UserGoals",
                newName: "Goals");

            migrationBuilder.RenameIndex(
                name: "IX_UserGoals_UserId",
                table: "Goals",
                newName: "IX_Goals_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Goals",
                table: "Goals",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_AspNetUsers_UserId",
                table: "Goals",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
