using Microsoft.EntityFrameworkCore.Migrations;

namespace CarRental_Backend.Migrations
{
    public partial class removecarfeedvack : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_bookings_cars_CarId",
                table: "bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_bookings_feedbacks_FeedbackId",
                table: "bookings");

            migrationBuilder.DropIndex(
                name: "IX_bookings_CarId",
                table: "bookings");

            migrationBuilder.DropIndex(
                name: "IX_bookings_FeedbackId",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "CarId",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "FeedbackId",
                table: "bookings");

            migrationBuilder.CreateIndex(
                name: "IX_feedbacks_BookingId",
                table: "feedbacks",
                column: "BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_feedbacks_bookings_BookingId",
                table: "feedbacks",
                column: "BookingId",
                principalTable: "bookings",
                principalColumn: "BookingId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_feedbacks_bookings_BookingId",
                table: "feedbacks");

            migrationBuilder.DropIndex(
                name: "IX_feedbacks_BookingId",
                table: "feedbacks");

            migrationBuilder.AddColumn<int>(
                name: "CarId",
                table: "bookings",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FeedbackId",
                table: "bookings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_bookings_CarId",
                table: "bookings",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_bookings_FeedbackId",
                table: "bookings",
                column: "FeedbackId",
                unique: true,
                filter: "[FeedbackId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_bookings_cars_CarId",
                table: "bookings",
                column: "CarId",
                principalTable: "cars",
                principalColumn: "CarId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_bookings_feedbacks_FeedbackId",
                table: "bookings",
                column: "FeedbackId",
                principalTable: "feedbacks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
