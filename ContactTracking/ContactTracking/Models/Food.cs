namespace ContactTracking.Models
{
    public class FoodSubmission
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Message { get; set; } = "";
        public string Location { get; set; } = "";
        public DateTime SubmissionDateTime { get; set; }
    }
}