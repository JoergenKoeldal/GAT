using Microsoft.AspNetCore.Mvc;
using GatApi.Data;
using GatApi.Services;

namespace GatApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PdfController : ControllerBase
    {
        private PdfService pdfService;

        public PdfController(GatApiContext context)
        {
            this.pdfService = new PdfService(context);
        }

        [HttpGet]
        public async Task<IActionResult> GetPdf(long departmentId)
        {

            MemoryStream ms = await pdfService.GetPdf(departmentId);

            var fileStreamResult = new FileStreamResult(ms, "application/pdf");

            //fileStreamResult.FileDownloadName = "Hans";

            return fileStreamResult;

        }

    }
}
