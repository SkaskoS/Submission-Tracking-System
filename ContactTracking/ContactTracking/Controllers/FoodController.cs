using ContactTracking.Data;
using ContactTracking.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactTracking.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FoodController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post(FoodSubmission submission)
        {
            submission.SubmissionDateTime = DateTime.Now;

            //_context.FoodSubmissions.Add(submission);
            //await _context.SaveChangesAsync();

            _context.MainSubmissions.Add(new MainSubmission
            {
                SourceType = "Food",
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

            return Ok(new { success = true, message = "Food submission saved." });
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var foods = await _context.FoodSubmissions
                .OrderByDescending(f => f.SubmissionDateTime)
                .ToListAsync();

            return Ok(foods);
        }
    }
}