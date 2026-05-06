using ContactTracking.Data;
using ContactTracking.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactTracking.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubmissionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SubmissionsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var submissions = await _context.MainSubmissions
                .OrderByDescending(s => s.SubmissionDateTime)
                .ToListAsync();

            return Ok(submissions);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubmission(
            int id,
            [FromBody] SubmissionUpdateRequest request)
        {
            var item = await _context.MainSubmissions.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            item.Name = request.Name;
            item.Email = request.Email;
            item.Message = request.Message;
            item.FollowUpStatus = request.FollowUpStatus;
            item.AssignedTo = request.AssignedTo;
            item.Notes = request.Notes;

            await _context.SaveChangesAsync();

            return Ok(new { success = true });
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubmission(int id)
        {
            var item = await _context.MainSubmissions.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            _context.MainSubmissions.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new { success = true });
        }
    }
}