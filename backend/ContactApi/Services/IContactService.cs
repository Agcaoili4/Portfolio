using ContactApi.Models.Dtos;

namespace ContactApi.Services;

public interface IContactService
{
    Task<ContactServiceResult> SubmitAsync(
        ContactRequestDto dto, string? ip, string? userAgent, CancellationToken ct = default);
}

public record ContactServiceResult(bool Success, ContactResponseDto? Response, string? FailureReason);
