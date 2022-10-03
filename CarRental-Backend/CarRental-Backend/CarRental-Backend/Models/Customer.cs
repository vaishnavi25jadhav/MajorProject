using System;
using System.ComponentModel.DataAnnotations;

namespace CarRental_Backend.Models
{
    public class Customer
    {
        [Key]

       
        public string Userid { get; set; }
       
        public string Name { get; set; }
       
        public string City { get; set; }

       
        public string Pwd { get; set; }
       
      
        public string Phone { get; set; }
      
        public string Gender { get; set; }
        public DateTime CreatedOn { get; set; }= DateTime.Now;
    }
}
