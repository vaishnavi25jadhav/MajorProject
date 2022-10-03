using CarRental_Backend.DTOs;
using CarRental_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly CarRentalDbContext _context;

        public BookingController(CarRentalDbContext context)
        {
            _context = context;
        }
        // POST: api/Company
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<IActionResult> SaveBooking(DTOs.BookingDTO booking)
        {
            await _context.bookings.AddAsync(booking);
            var id=await _context.SaveChangesAsync();
            var pmt = new Payment
            {
                Nameoncard = booking.Nameoncard,
                Amount = booking.Advance,
                BookingId = booking.BookingId,
                CardNo = booking.CardNo,
                IsCompleted=booking.Advance==booking.BillAmount
            };
            await _context.payment.AddAsync(pmt);
            await _context.SaveChangesAsync();
            return Ok(new { msg = "Booked successfully" });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.bookings.Include(x=>x.Variant).Include(x=>x.Customer).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookingDetails(int id)
        {
            return Ok(await _context.bookings.Include(x => x.Variant).FirstOrDefaultAsync(x=>x.BookingId==id));
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsersBooking(string userid)
        {
            return Ok(await _context.bookings.Include(x => x.Variant).Where(x=>x.UserId==userid).ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(int id,UpdateBookingStatusDTO dto)
        {
            var bk =await _context.bookings.FindAsync(id);
            bk.Status = dto.Status;
            await _context.SaveChangesAsync();
            return Ok(new {msg="Status updated"});
        }

        [HttpGet("payments/{id}")]
        public async Task<IActionResult> BookingPayment(int id)
        {
            return Ok(await _context.payment.Where(x=>x.BookingId==id).Include(x=>x.Booking).ToListAsync());
        }

        [HttpGet("report")]
        public async Task<IActionResult> Report()
        {
            return Ok(await _context.payment.Include(x => x.Booking).ToListAsync());
        }

        [HttpPost("payment")]
        public async Task<IActionResult> SavePayment(Payment payment)
        {
            await _context.payment.AddAsync(payment);
            var bk = await _context.bookings.FindAsync(payment.BookingId);
            bk.Status = "Closed";
            await _context.SaveChangesAsync();
            return Ok(new { msg = "Booking completed" });
        }
    }
}
