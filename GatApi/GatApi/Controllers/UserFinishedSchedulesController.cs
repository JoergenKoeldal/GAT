using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GatApi.Data;
using GatApi.Models;

namespace GatApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFinishedSchedulesController : ControllerBase
    {
        private readonly GatApiContext _context;

        public UserFinishedSchedulesController(GatApiContext context)
        {
            _context = context;
        }

        // GET: api/UserFinishedSchedules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserFinishedSchedule>>> GetUserFinishedSchedule()
        {
            return await _context.UserFinishedSchedule.ToListAsync();
        }

        // GET: api/UserFinishedSchedules/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserFinishedSchedule>> GetUserFinishedSchedule(long id)
        {
            var userFinishedSchedule = await _context.UserFinishedSchedule.FindAsync(id);

            if (userFinishedSchedule == null)
            {
                return NotFound();
            }

            return userFinishedSchedule;
        }

        // PUT: api/UserFinishedSchedules/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserFinishedSchedule(long id, UserFinishedSchedule userFinishedSchedule)
        {
            if (id != userFinishedSchedule.ScheduleId)
            {
                return BadRequest();
            }

            _context.Entry(userFinishedSchedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserFinishedScheduleExists(id))
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

        // POST: api/UserFinishedSchedules
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HttpResponseMessage>> PostUserFinishedSchedule(long userId)
        {
            DateTime currentDateTime = DateTime.Now;

            long scheduleId = _context.Schedule.Where(x => x.StartDate < currentDateTime && x.EndDate > currentDateTime).FirstOrDefault().ScheduleId;

            UserFinishedSchedule userFinishedSchedule = new UserFinishedSchedule
            {
                UserId = userId,
                ScheduleId = scheduleId,
                FinishedAt = currentDateTime
            };
            _context.UserFinishedSchedule.Add(userFinishedSchedule);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserFinishedScheduleExists(userFinishedSchedule.ScheduleId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // DELETE: api/UserFinishedSchedules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserFinishedSchedule(long id)
        {
            var userFinishedSchedule = await _context.UserFinishedSchedule.FindAsync(id);
            if (userFinishedSchedule == null)
            {
                return NotFound();
            }

            _context.UserFinishedSchedule.Remove(userFinishedSchedule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserFinishedScheduleExists(long id)
        {
            return _context.UserFinishedSchedule.Any(e => e.ScheduleId == id);
        }
    }
}
