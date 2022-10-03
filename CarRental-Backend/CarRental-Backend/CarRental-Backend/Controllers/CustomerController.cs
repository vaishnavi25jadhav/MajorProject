using CarRental_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CarRental_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CarRentalDbContext _context;

        public CustomerController(CarRentalDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SaveCustomer(Customer customer)
        {
            _context.customers.Add(customer);
            await _context.SaveChangesAsync();
            return Ok(new { msg = "Customer registered successfully" });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.customers.ToListAsync());
        }        
    }
}
