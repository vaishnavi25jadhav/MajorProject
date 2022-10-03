using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarRental_Backend.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        public int Ratings { get;set; }
        public string Descr { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        [ForeignKey("BookingId")]
        public int BookingId { get; set; }
        public virtual Booking Booking { get; set; }
    }
}
