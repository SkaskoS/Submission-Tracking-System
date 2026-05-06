namespace ContactTracking.Models
{
    public class SubmissionSummary
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string FormType { get; set; } = "";
        public string Message { get; set; } = "";
        public DateTime SubmissionDateTime { get; set; }
        public string Status { get; set; } = "New";
    }
}