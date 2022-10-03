using CarRental_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly CarRentalDbContext _context;
        private readonly ILogger<CompanyController> _logger;

        public CompanyController(CarRentalDbContext context, ILogger<CompanyController> logger)
        {
            _context = context;
            _logger = logger;
        }
        // POST: api/Company
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<IActionResult> SaveCompany(Company company)
        {
            _context.companies.Add(company);
            await _context.SaveChangesAsync();
            return Ok(new { msg = "Company saved successfully" });
        }

        [HttpGet]
        public async Task<IActionResult> ListAll()
        {
            return Ok(await _context.companies.ToListAsync());
        }
        // DELETE: api/Company/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int? id)
        {
            if (!id.HasValue)
            {
                return BadRequest();
            }

            try
            {
                var category = await _context.companies.FindAsync(id);
                if (category == null)
                {
                    return NotFound();
                }

                _context.companies.Remove(category);
                await _context.SaveChangesAsync();

                return Ok(category);
            }
            catch (System.Exception exp)
            {
                ModelState.AddModelError("DELETE", exp.Message);
                return BadRequest(ModelState);
            }
            
        }
        private bool CompanyExists(int id)
        {
            return _context.companies.Any(e => e.CompanyId == id);
        }


        //var cmp = await _context.companies.FindAsync(id);
        //    if (cmp != null)
        //    {
        //        _context.companies.Remove(cmp);
        //        await _context.SaveChangesAsync();
        //        return Ok(new { msg = "Deleted successfully" });
        //    }
        //    throw new System.Exception("Cannot delete company");
        //}
    }
}
