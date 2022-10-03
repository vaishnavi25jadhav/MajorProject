using System;
using System.Collections.Generic;
using System.Text;
using Xunit.Abstractions;

namespace CarRental.xUnitTestProject
{
     public partial class CompanyApiTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public CompanyApiTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

    }
}
