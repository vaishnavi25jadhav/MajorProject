using Microsoft.EntityFrameworkCore;

namespace CarRental_Backend.Models
{
    public class CarRentalDbContext:DbContext
    {
        internal readonly object Company;

        public CarRentalDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Admin> admins { get; set; }
        public DbSet<Company> companies { get; set; }
        public DbSet<Variant> variants { get; set; }
        public DbSet<Car> cars { get; set; }
        public DbSet<Customer> customers { get; set; } 
        public DbSet<Booking> bookings { get; set; }
        public DbSet<Feedback> feedbacks { get; set; }
        public DbSet<Payment> payment { get; set; }

    }
}
