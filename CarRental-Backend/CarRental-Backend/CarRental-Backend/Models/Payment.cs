using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarRental_Backend.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }
        public DateTime PmtDate { get; set; }= DateTime.Now;
        public string CardNo { get; set; }
        public string Nameoncard { get; set; }
        public int Amount { get; set; }
        public bool IsCompleted { get; set; } = false;
        [ForeignKey("BookingId")]
        public int BookingId { get; set; }
        public virtual Booking Booking { get; set; }
    }
}
