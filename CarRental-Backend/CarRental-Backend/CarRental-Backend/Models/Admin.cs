using System.ComponentModel.DataAnnotations;

namespace CarRental_Backend.Models
{
    public class Admin
    {
        [Key]
        public string Userid { get; set; }
        public string Uname { get; set; }
        public string Pwd { get; set; }
    }
}
