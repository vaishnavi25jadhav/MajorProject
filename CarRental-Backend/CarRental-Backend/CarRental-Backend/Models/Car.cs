using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarRental_Backend.Models
{
    public class Car
    {
        [Key]
        public int CarId { get; set; } 
        public int  ModelYear { get; set; }
        public bool IsAvailable { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedOn { get; set; }= DateTime.Now;
        [ForeignKey("VariantId")]
        public int VariantId { get; set; }
        public virtual Variant Variant { get; set; }
    }
}
