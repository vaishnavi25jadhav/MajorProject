using CarRental_Backend.DTOs;
using CarRental_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace CarRental_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VariantController : ControllerBase
    {
        private readonly CarRentalDbContext _context;

        public VariantController(CarRentalDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Getall(int cmpid)
        {
            if (cmpid == 0)
            {
                return Ok(await _context.variants.Include(x => x.Company).ToListAsync());
            }
            else
            {
                return Ok(await _context.variants.Where(x=>x.CompanyId==cmpid).Include(x => x.Company).ToListAsync());
            }
        }

        [HttpGet("{id:int:min(1)}")]
        public async Task<IActionResult> GetDetails(int id)
        {
            return Ok(await _context.variants.Include(x=>x.Company).FirstOrDefaultAsync(x=>x.VariantId==id));
        }

        [HttpPost]
        public async Task<IActionResult> SaveVariant([FromForm] AddVariantDTO variant)
        {
            var filename = Guid.NewGuid().ToString() + Path.GetExtension(variant.Pic.FileName);

            using (var tempfile = System.IO.File.Create(@"wwwroot\Photos\" + filename))
            {
                variant.Pic.CopyTo(tempfile);
                tempfile.Flush();
            }
            variant.Photo = "Photos/" + filename;

            _context.variants.Add(variant);
            await _context.SaveChangesAsync();
            return Ok(new { msg = "Variant saved successfully" });
        }

        [HttpDelete("{id:int:min(1)}")]
        public async Task<IActionResult> Delete(int id)
        {
            var variant= await _context.variants.FindAsync(id);
            if (variant == null)
            {
                return NotFound();
            }
            _context.variants.Remove(variant);
            await _context.SaveChangesAsync();
            return Ok(new { msg = "Variant deleted successfully" });
        }
    }
}
