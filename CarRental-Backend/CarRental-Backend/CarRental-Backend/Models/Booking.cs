using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarRental_Backend.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }
        public int Advance { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Message { get; set; }
        public int BillAmount { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string Status { get; set; } = "Pending";
        public string UserId { get; set; }
        public int? VariantId { get; set; }

        [ForeignKey("UserId")]
        public virtual Customer Customer { get; set; }
        [ForeignKey("VariantId")]
        public virtual Variant Variant { get; set; }
    }
}
