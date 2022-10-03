using CarRental_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarRental.xUnitTestProject
{
    public static class DbContextMocker
    {
        public static CarRentalDbContext GetCarRentalDbContext(string dbName)
        {
            // Create a fresh service provider for the InMemory Database instance
            var serviceProvider = new ServiceCollection()
                                  .AddEntityFrameworkInMemoryDatabase()
                                  .BuildServiceProvider();

            // Create a new options instance telling the context
            // to use InMemory database with the new service provider created above
            var options = new DbContextOptionsBuilder<CarRentalDbContext>()
                           .UseInMemoryDatabase(dbName)
                           .UseInternalServiceProvider(serviceProvider)
                           .Options;

            // Create the instance of the DbContext
            var dbContext = new CarRentalDbContext(options);

            // Add entities to the InMemory Database to seed the test data

            dbContext.SeedData();
            return dbContext;
        }
        internal static readonly Company[] TestData_companies
          = {
                new Company
                {
                    CompanyId = 1,
                    Name = "First Company"
                },
                new Company
                {
                     CompanyId = 2,
                    Name = "Second Company"
                },
                new Company
                {
                     CompanyId = 3,
                    Name = "Third Company"
                },
            };

        /// <summary>
        ///     An extension Method for the DbContext object to Seed the Test Data.
        /// </summary>
        /// <param name="context">Application Db Context object.</param>
        private static void SeedData(this CarRentalDbContext context)
        {
            context.companies.AddRange(TestData_companies);

            // Commit the Changes to the database
            context.SaveChanges();
        }

        }
}
