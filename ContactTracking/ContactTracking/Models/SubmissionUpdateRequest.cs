namespace ContactTracking.Models
{
    public class SubmissionUpdateRequest
    {
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Message { get; set; } = "";

        public string FollowUpStatus { get; set; } = "New";
        public string AssignedTo { get; set; } = "";
        public string Notes { get; set; } = "";
    }
}