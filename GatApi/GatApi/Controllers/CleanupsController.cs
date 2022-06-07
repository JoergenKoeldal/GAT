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
    public class CleanupsController : ControllerBase
    {
        private readonly GatApiContext _context;

        public CleanupsController(GatApiContext context)
        {
            _context = context;
        }

        // GET: api/Cleanups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CleanupViewModel>>> GetCleanup()
        {
            var cleanups = await _context.Cleanup.ToListAsync();

            List<CleanupViewModel> cleanupViewModels = new List<CleanupViewModel>();

            foreach(Cleanup c in cleanups)
            {
                CleanupViewModel cleanupViewModel = new CleanupViewModel
                {
                    UserId = c.UserId,
                    Deleted = c.Deleted,
                    Hits = c.Hits,
                    SourceId = c.SourceId
                };
                cleanupViewModels.Add(cleanupViewModel);
            }
            return cleanupViewModels;
        }

        // GET: api/Cleanups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cleanup>> GetCleanup(long id)
        {
            var cleanup = await _context.Cleanup.FindAsync(id);

            if (cleanup == null)
            {
                return NotFound();
            }

            return cleanup;
        }

        // PUT: api/Cleanups/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCleanup(long id, Cleanup cleanup)
        {
            if (id != cleanup.CleanupId)
            {
                return BadRequest();
            }

            _context.Entry(cleanup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CleanupExists(id))
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

        // POST: api/Cleanups
        [HttpPost]
        public async Task<ActionResult<Cleanup>> PostCleanup(CleanupViewModel cleanupViewModel)
        {
            Cleanup cleanup = new Cleanup
            {
                UserId = cleanupViewModel.UserId,
                SourceId = cleanupViewModel.SourceId,
                Deleted = cleanupViewModel.Deleted,
                Hits = cleanupViewModel.Hits,
                Timestamp = DateTime.Now
            };

            _context.Cleanup.Add(cleanup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCleanup", new { id = cleanup.CleanupId }, cleanup);
        }

        // DELETE: api/Cleanups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCleanup(long id)
        {
            var cleanup = await _context.Cleanup.FindAsync(id);
            if (cleanup == null)
            {
                return NotFound();
            }

            _context.Cleanup.Remove(cleanup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CleanupExists(long id)
        {
            return _context.Cleanup.Any(e => e.CleanupId == id);
        }
    }
}
