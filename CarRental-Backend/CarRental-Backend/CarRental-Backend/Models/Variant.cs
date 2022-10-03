using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarRental_Backend.Models
{
    public class Variant
    {
        [Key]
        public int VariantId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Photo { get; set; }
        public DateTime CreatedOn { get; set; }=DateTime.Now;
        public bool IsActive { get; set; } = true;

        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public virtual Company Company { get; set; }
    }
}
