using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPhoneRepairWeb.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult CompanyMenu()
        {
            return View();
        }
        public IActionResult CompanySubMenu()
        {
            return View();
        }
        public IActionResult ViewContactQuote()
        {
            return View();
        }
    }
}
