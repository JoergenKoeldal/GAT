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
    public class KeywordListsController : ControllerBase
    {
        private readonly GatApiContext _context;

        public KeywordListsController(GatApiContext context)
        {
            _context = context;
        }

        // GET: api/KeywordLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KeywordListViewModel>>> GetKeywordList()
        {
            var keywordList = await _context.KeywordList.Include(keywordList => keywordList.KeywordListHasKeywords).ThenInclude(klhk => klhk.Keyword).ToListAsync();

            List<KeywordListViewModel> keywordListViewModels = new List<KeywordListViewModel>();

            foreach(KeywordList k in keywordList)
            {
                KeywordListViewModel keywordListViewModel = new KeywordListViewModel();
                keywordListViewModel.Name = k.Name;
                foreach(KeywordListHasKeyword klhk in k.KeywordListHasKeywords)
                {
                    keywordListViewModel.Keywords.Add(klhk.Keyword.Word);
                }
                keywordListViewModels.Add(keywordListViewModel);
            }

            return keywordListViewModels;
        }

        // GET: api/KeywordLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<KeywordList>> GetKeywordList(long id)
        {
            var keywordList = await _context.KeywordList.FindAsync(id);

            if (keywordList == null)
            {
                return NotFound();
            }

            return keywordList;
        }

        // PUT: api/KeywordLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKeywordList(long id, KeywordList keywordList)
        {
            if (id != keywordList.KeywordListId)
            {
                return BadRequest();
            }

            _context.Entry(keywordList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KeywordListExists(id))
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

        // POST: api/KeywordLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<KeywordList>> PostKeywordList(KeywordList keywordList)
        {
            _context.KeywordList.Add(keywordList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKeywordList", new { id = keywordList.KeywordListId }, keywordList);
        }

        // DELETE: api/KeywordLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKeywordList(long id)
        {
            var keywordList = await _context.KeywordList.FindAsync(id);
            if (keywordList == null)
            {
                return NotFound();
            }

            _context.KeywordList.Remove(keywordList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool KeywordListExists(long id)
        {
            return _context.KeywordList.Any(e => e.KeywordListId == id);
        }
    }
}
