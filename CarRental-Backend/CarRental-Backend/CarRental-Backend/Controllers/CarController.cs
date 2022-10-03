using CarRental_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CarRental_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly CarRentalDbContext _context;

        public CarController(CarRentalDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SaveCar(Car car)
        {
            _context.cars.Add(car);
            await _context.SaveChangesAsync();
            return Ok(new { msg = "Car saved successfully" });
        }

        [HttpGet]
        public async Task<IActionResult> ListAll()
        {
            return Ok(await _context.cars.ToListAsync());
        }
    }
}
