using ContactApi.Models.Entities;

namespace ContactApi.Services;

public interface IEmailSender
{
    Task SendAsync(ContactSubmission submission, CancellationToken ct = default);
}
