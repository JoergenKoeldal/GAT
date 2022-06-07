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
            var users = await _context.User.Include("Department").ToListAsync();
            List<UserViewModel> userViewModels = UserVmMapper(users);

            return userViewModels;
        }

        // GET: api/Users/email
        [HttpGet("{email}")]
        public async Task<ActionResult<UserViewModel>> GetUser(string email)
        {
            var user = await _context.User.Where(x => x.Email == email).Include("Department").ToListAsync();

            if (user == null)
            {
                return NotFound();
            }



            return UserVmMapper(user).FirstOrDefault();
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(long id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(long id)
        {
            return _context.User.Any(e => e.UserId == id);
        }

        private List<UserViewModel> UserVmMapper(List<User> users)
        {
            List<UserViewModel> result = new List<UserViewModel>();
            foreach (var user in users)
            {
                result.Add(new UserViewModel
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Email = user.Email,
                    DepartmentId = user.Department.DepartmentId
                });
            }

            return result;
        } 
    }
}
