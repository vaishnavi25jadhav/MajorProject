using System.ComponentModel.DataAnnotations;

namespace CarRental_Backend.Models
{
    public class Company
    {
        [Key]
        public int CompanyId { get; set; }
        public string Name { get; set; }
    }
}
