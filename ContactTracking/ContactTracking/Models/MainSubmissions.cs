using System.ComponentModel.DataAnnotations;

namespace ContactTracking.Models
{
    public class MainSubmission
    {
        public int Id { get; set; }

        [Required]
        public string SourceType { get; set; } = "";

        public int SourceId { get; set; }

        [Required]
        public string Name { get; set; } = "";

        [Required]
        public string Email { get; set; } = "";

        public string Message { get; set; } = "";

        public DateTime SubmissionDateTime { get; set; }

        public string FollowUpStatus { get; set; } = "New";

        public string AssignedTo { get; set; } = "";

        public string Notes { get; set; } = "";
    }
}