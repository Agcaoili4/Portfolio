
namespace ContactApi.Models.Entities;

// The class definition for ContactSubmission 
public class ContactSubmission
{
    // Guid property to uniquely identify each contact submission
    public Guid Id { get; set; }
<<<<<<< Updated upstream
=======
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime SubmittedAt { get; set; }
    public string? IpAddress { get; set; }
    public string? UserAgent { get; set; }
    public DateTime? EmailSentAt { get; set; }
    public string? EmailError { get; set; }
>>>>>>> Stashed changes
}