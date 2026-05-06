using System.ComponentModel.DataAnnotations;

namespace ContactTracking.Models
{
    public class ContactSubmission
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = "";

        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";

        [Required]
        public string Message { get; set; } = "";

        public DateTime SubmissionDateTime { get; set; }
    }
}