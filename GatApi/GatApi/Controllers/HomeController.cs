using Microsoft.AspNetCore.Mvc;

namespace GatApi.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
