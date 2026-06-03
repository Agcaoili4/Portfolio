using System.Net.Http.Headers;
using System.Net.Http.Json;
using ContactApi.Models.Entities;

namespace ContactApi.Services;

public class ResendEmailSender(HttpClient http, IConfiguration config, ILogger<ResendEmailSender> logger)
    : IEmailSender
{
    public async Task SendAsync(ContactSubmission s, CancellationToken ct = default)
    {
        var apiKey = config["Resend:ApiKey"]
            ?? throw new InvalidOperationException("Resend:ApiKey not configured.");
        var from = config["Resend:FromAddress"]
            ?? throw new InvalidOperationException("Resend:FromAddress not configured.");
        var to = config["Resend:ToAddress"]
            ?? throw new InvalidOperationException("Resend:ToAddress not configured.");

        http.BaseAddress = new Uri("https://api.resend.com/");
        http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        var payload = new
        {
            from,
            to = new[] { to },
            subject = $"Portfolio contact from {s.Name}",
            text = $"From: {s.Name} <{s.Email}>\n\n{s.Message}\n\n---\nSubmission ID: {s.Id}",
            reply_to = s.Email
        };

        using var resp = await http.PostAsJsonAsync("emails", payload, ct);

        if (!resp.IsSuccessStatusCode)
        {
            var body = await resp.Content.ReadAsStringAsync(ct);
            logger.LogError("Resend send failed for {SubmissionId}: {Status} {Body}",
                s.Id, resp.StatusCode, body);
            throw new HttpRequestException($"Resend returned {(int)resp.StatusCode}: {body}");
        }

        logger.LogInformation("Resend send OK for {SubmissionId}", s.Id);
    }
}
