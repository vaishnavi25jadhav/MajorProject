using CarRental_Backend.Models;

namespace CarRental_Backend.DTOs
{
    public class BookingDTO : Booking
    {
        public string CardNo { get; set; }
        public string Nameoncard { get; set; }
    }
}
