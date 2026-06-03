using System.Net.Http.Json;

namespace ContactApi.Services;

public class TurnstileVerifier(HttpClient http, IConfiguration config, ILogger<TurnstileVerifier> logger)
    : ITurnstileVerifier
{
    private record SiteVerifyResponse(bool success, string[]? error_codes);

    public async Task<bool> VerifyAsync(string token, string? remoteIp, CancellationToken ct = default)
    {
        var secret = config["Turnstile:SecretKey"]
            ?? throw new InvalidOperationException("Turnstile:SecretKey not configured.");
        var url = config["Turnstile:VerifyUrl"]
            ?? "https://challenges.cloudflare.com/turnstile/v0/siteverify";

        var form = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["secret"] = secret,
            ["response"] = token,
            ["remoteip"] = remoteIp ?? ""
        });

        using var resp = await http.PostAsync(url, form, ct);
        var data = await resp.Content.ReadFromJsonAsync<SiteVerifyResponse>(cancellationToken: ct);

        if (data is null || !data.success)
        {
            logger.LogWarning("Turnstile verify failed: codes={Codes}",
                string.Join(",", data?.error_codes ?? Array.Empty<string>()));
            return false;
        }
        return true;
    }
}
