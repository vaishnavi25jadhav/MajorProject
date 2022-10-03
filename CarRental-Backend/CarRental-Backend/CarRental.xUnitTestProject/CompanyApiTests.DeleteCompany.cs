﻿using CarRental_Backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace CarRental.xUnitTestProject
{
    public partial class CompanyApiTests
    {
        [Fact]
        public void DeleteCompany_NotFoundResult()
        {
            // ARRANGE
            var dbName = nameof(CompanyApiTests.DeleteCompany_NotFoundResult);
            var logger = Mock.Of<ILogger<CompanyController>>();
            using var dbContext = DbContextMocker.GetCarRentalDbContext(dbName);      // Disposable!
            var apiController = new CompanyController(dbContext, logger);
            int findCategoryID = 900;

            // ACT
            IActionResult actionResultDelete = apiController.DeleteCompany(findCategoryID).Result;

            // ASSERT - check if the IActionResult is NotFound 
            Assert.IsType<NotFoundResult>(actionResultDelete);

            // ASSERT - check if the Status Code is (HTTP 404) "NotFound"
            int expectedStatusCode = (int)System.Net.HttpStatusCode.NotFound;
            var actualStatusCode = (actionResultDelete as NotFoundResult).StatusCode;
            Assert.Equal<int>(expectedStatusCode, actualStatusCode);
        }
        [Fact]
        public void DeleteCompany_BadRequestResult()
        {
            // ARRANGE
            var dbName = nameof(CompanyApiTests.DeleteCompany_BadRequestResult);
            var logger = Mock.Of<ILogger<CompanyController>>();
            using var dbContext = DbContextMocker.GetCarRentalDbContext(dbName);      // Disposable!
            var apiController = new CompanyController(dbContext, logger);
            int? findCompanyID = null;

            // ACT
            IActionResult actionResultDelete = apiController.DeleteCompany(findCompanyID).Result;

            // ASSERT - check if the IActionResult is BadRequest 
            Assert.IsType<BadRequestResult>(actionResultDelete);

            // ASSERT - check if the Status Code is (HTTP 400) "BadRequest"
            int expectedStatusCode = (int)System.Net.HttpStatusCode.BadRequest;
            var actualStatusCode = (actionResultDelete as BadRequestResult).StatusCode;
            Assert.Equal<int>(expectedStatusCode, actualStatusCode);
        }
        [Fact]
        public void DeleteCompany_OkResult()
        {
            // ARRANGE
            var dbName = nameof(CompanyApiTests.DeleteCompany_BadRequestResult);
            var logger = Mock.Of<ILogger<CompanyController>>();
            using var dbContext = DbContextMocker.GetCarRentalDbContext(dbName);      // Disposable!
            var apiController = new CompanyController(dbContext, logger);
            int findCompanyID = 1;

            // ACT
            IActionResult actionResultDelete = apiController.DeleteCompany(findCompanyID).Result;

            // ASSERT - if IActionResult is Ok
            Assert.IsType<OkObjectResult>(actionResultDelete);

            // ASSERT - if Status Code is HTTP 200 (Ok)
            int expectedStatusCode = (int)System.Net.HttpStatusCode.OK;
            var actualStatusCode = (actionResultDelete as OkObjectResult).StatusCode.Value;
            Assert.Equal<int>(expectedStatusCode, actualStatusCode);
        }
    }
}
