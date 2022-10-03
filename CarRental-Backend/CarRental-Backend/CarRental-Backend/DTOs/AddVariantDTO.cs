using CarRental_Backend.Models;
using Microsoft.AspNetCore.Http;

namespace CarRental_Backend.DTOs
{
    public class AddVariantDTO:Variant
    {
        public IFormFile Pic { get; set; }
    }
}
