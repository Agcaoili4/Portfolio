using ContactApi.Services;

namespace ContactApi.Tests;

public class FakeTurnstileVerifier : ITurnstileVerifier
{
    public bool Result { get; set; } = true;

    public Task<bool> VerifyAsync(string token, string? remoteIp, CancellationToken ct = default)
        => Task.FromResult(Result);

    public void Reset() => Result = true;
}
