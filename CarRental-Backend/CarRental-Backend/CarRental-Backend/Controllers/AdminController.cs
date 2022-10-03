using CarRental_Backend.DTOs;
using CarRental_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CarRental_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly CarRentalDbContext _context;

        public AdminController(CarRentalDbContext context)
        {
            _context = context;
        }
        // POST: api/Company
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("validate")]
        public async Task<IActionResult> Validate(LoginDTO dto)
        {
            if (dto.Role == "Admin")
            {
                var admin = await _context.admins.FirstOrDefaultAsync(x => x.Userid == dto.UserId && x.Pwd == dto.Pwd);
                if (admin == null)
                    return BadRequest(new { msg = "Invalid username or password" });
                else
                    return Ok(new {Userid=admin.Userid,Uname=admin.Uname,Role="Admin" });
            }
            else
            {
                var user=await _context.customers.FirstOrDefaultAsync(x=>x.Userid==dto.UserId && x.Pwd==dto.Pwd);
                if (user == null)
                    return BadRequest(new { msg = "Invalid username or password" });
                else
                    return Ok(new { Userid = user.Userid, Uname = user.Name, Role = "Customer" });            
            }
        }
    }
}
