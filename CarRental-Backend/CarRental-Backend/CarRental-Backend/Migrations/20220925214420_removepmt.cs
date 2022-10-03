using Microsoft.EntityFrameworkCore.Migrations;

namespace CarRental_Backend.Migrations
{
    public partial class removepmt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_bookings_payment_PaymentId",
                table: "bookings");

            migrationBuilder.DropIndex(
                name: "IX_bookings_PaymentId",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "bookings");

            migrationBuilder.CreateIndex(
                name: "IX_payment_BookingId",
                table: "payment",
                column: "BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_payment_bookings_BookingId",
                table: "payment",
                column: "BookingId",
                principalTable: "bookings",
                principalColumn: "BookingId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_payment_bookings_BookingId",
                table: "payment");

            migrationBuilder.DropIndex(
                name: "IX_payment_BookingId",
                table: "payment");

            migrationBuilder.AddColumn<int>(
                name: "PaymentId",
                table: "bookings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_bookings_PaymentId",
                table: "bookings",
                column: "PaymentId",
                unique: true,
                filter: "[PaymentId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_bookings_payment_PaymentId",
                table: "bookings",
                column: "PaymentId",
                principalTable: "payment",
                principalColumn: "PaymentId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
