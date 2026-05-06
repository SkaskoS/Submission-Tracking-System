using ContactTracking.Data;
using ContactTracking.Models;
using Microsoft.AspNetCore.Mvc;

namespace ContactTracking.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post(ContactSubmission submission)
        {
            submission.SubmissionDateTime = DateTime.Now;

            _context.ContactSubmissions.Add(submission);
            await _context.SaveChangesAsync();

            _context.MainSubmissions.Add(new MainSubmission
            {
                SourceType = "Contact",
                SourceId = submission.Id,
                Name = submission.Name,
                Email = submission.Email,
                Message = submission.Message,
                SubmissionDateTime = submission.SubmissionDateTime,
                FollowUpStatus = "New",
                AssignedTo = "",
                Notes = ""
            });

            await _context.SaveChangesAsync();

            return Ok(new { success = true });
        }
    }
}