using ContactApi.Models.Entities;
using ContactApi.Services;

namespace ContactApi.Tests;

public class FakeEmailSender : IEmailSender
{
    public List<ContactSubmission> Sent { get; } = new();
    public Exception? ThrowOnSend { get; set; }

    public Task SendAsync(ContactSubmission submission, CancellationToken ct = default)
    {
        if (ThrowOnSend is not null) throw ThrowOnSend;
        Sent.Add(submission);
        return Task.CompletedTask;
    }

    public void Reset()
    {
        Sent.Clear();
        ThrowOnSend = null;
    }
}
