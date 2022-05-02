using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GatApi.Data;
using GatApi.Models;
using GatApi.ViewModels;

namespace GatApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly GatApiContext _context;

        public UsersController(GatApiContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PdfViewModel>>> GetUser()
        {
            Schedule CurrentSchedule = _context.Schedule.OrderByDescending(dt => dt.Date).FirstOrDefault();
            List<User> userList = await _context.User.Include(user => user.Department).Include(user => user.UserFinishedSchedules).ThenInclude(userFinishedSchedule => userFinishedSchedule.Schedule).ToListAsync();
            List<PdfViewModel> userViewModels = new List<PdfViewModel>();

            foreach(User user in userList)
            {
                PdfViewModel pdfViewModel = new PdfViewModel();
                pdfViewModel.DepartmentName = user.Department.Name;
                pdfViewModel.Name = user.Name;
                if(user.UserFinishedSchedules.Count > 0)
                {
                    foreach (UserFinishedSchedule ufs in user.UserFinishedSchedules)
                    {
                        if(ufs.ScheduleId == CurrentSchedule.ScheduleId)
                        {
                            pdfViewModel.IsScheduleFinished = "X";
                        }
                    }
                }
                userViewModels.Add(pdfViewModel);

            }

            return userViewModels;
        }
        [HttpGet]
        [Route("pdf")]
        public async Task<ActionResult<string>> CreatePdf()
        {

            Schedule CurrentSchedule = _context.Schedule.OrderByDescending(dt => dt.Date).FirstOrDefault();
            List<User> userList = await _context.User.Include(user => user.Department).Include(user => user.UserFinishedSchedules).ThenInclude(userFinishedSchedule => userFinishedSchedule.Schedule).ToListAsync();
            List<PdfViewModel> pdfViewModels = new List<PdfViewModel>();

            foreach (User user in userList)
            {
                PdfViewModel pdfViewModel = new PdfViewModel();
                pdfViewModel.DepartmentName = user.Department.Name;
                pdfViewModel.Name = user.Name;
                if (user.UserFinishedSchedules.Count > 0)
                {
                    foreach (UserFinishedSchedule ufs in user.UserFinishedSchedules)
                    {
                        if (ufs.ScheduleId == CurrentSchedule.ScheduleId)
                        {
                            pdfViewModel.IsScheduleFinished = "X";
                            pdfViewModel.ScheduleFinishedAt = ufs.FinishedAt.ToString("dd-MM-yyyy");
                        }
                    }
                }
                pdfViewModels.Add(pdfViewModel);

            }


            Util.Util.GeneratePdf(pdfViewModels, CurrentSchedule.Date);
            return "PDF file generated!";
        }

        // GET: api/Users/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetUser(long id)
        //{
        //    var user = await _context.User.FindAsync(id);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return user;
        //}

    }
}
