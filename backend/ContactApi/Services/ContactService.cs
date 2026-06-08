using ContactApi.Data;
using ContactApi.Models.Dtos;
using ContactApi.Models.Entities;

namespace ContactApi.Services;

public class ContactService(
    AppDbContext db,
    ITurnstileVerifier turnstile,
    IEmailSender email,
    ILogger<ContactService> logger) : IContactService
{
    public async Task<ContactServiceResult> SubmitAsync(
        ContactRequestDto dto, string? ip, string? userAgent, CancellationToken ct = default)
    {
        if (!await turnstile.VerifyAsync(dto.TurnstileToken, ip, ct))
        {
            return new ContactServiceResult(false, null, "Bot check failed.");
        }

        var entity = new ContactSubmission
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Email = dto.Email,
            Message = dto.Message,
            SubmittedAt = DateTime.UtcNow,
            IpAddress = ip,
            UserAgent = userAgent
        };

        db.ContactSubmissions.Add(entity);
        await db.SaveChangesAsync(ct);
        // Log the SubmissionId only; the visitor's email is PII that doesn't
        // belong in third-party log retention (Render). The email is in the
        // DB row keyed by SubmissionId if a future investigation needs it.
        logger.LogInformation("Submission {SubmissionId} persisted", entity.Id);

        try
        {
            await email.SendAsync(entity, ct);
            entity.EmailSentAt = DateTime.UtcNow;
        }
        catch (Exception ex)
        {
            entity.EmailError = ex.Message;
            logger.LogError(ex, "Email send failed for {SubmissionId}", entity.Id);
        }
        await db.SaveChangesAsync(ct);

        return new ContactServiceResult(
            true,
            new ContactResponseDto(entity.Id, entity.SubmittedAt),
            null);
    }
}
