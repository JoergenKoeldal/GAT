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
        public async Task<ActionResult<IEnumerable<UserViewModel>>> GetUser()
        {
            Schedule CurrentSchedule = _context.Schedule.OrderByDescending(dt => dt.Date).FirstOrDefault();
            List<User> userList = await _context.User.Include(user => user.Department).Include(user => user.UserFinishedSchedules).ThenInclude(userFinishedSchedule => userFinishedSchedule.Schedule).ToListAsync();
            List<UserViewModel> userViewModels = new List<UserViewModel>();

            foreach(User user in userList)
            {
                UserViewModel userViewModel = new UserViewModel();
                userViewModel.DepartmentName = user.Department.Name;
                userViewModel.Name = user.Name;
                userViewModel.Email = user.Email;
                if(user.UserFinishedSchedules.Count > 0)
                {
                    foreach (UserFinishedSchedule ufs in user.UserFinishedSchedules)
                    {
                        if(ufs.ScheduleId == CurrentSchedule.ScheduleId)
                        {
                            userViewModel.IsScheduleFinished = true;
                        }
                    }
                }
                userViewModels.Add(userViewModel);

            }

            return userViewModels;
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
