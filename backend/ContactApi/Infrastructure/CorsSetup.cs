namespace ContactApi.Infrastructure;

public static class CorsSetup
{
    public const string PolicyName = "frontend";

    public static IServiceCollection AddFrontendCors(this IServiceCollection services, IConfiguration config)
    {
        var origins = (config["AllowedOrigins"] ?? "")
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        // Wildcard subdomains are NOT supported here. If a future env var change
        // adds "*.something" to AllowedOrigins, it would be treated as a literal
        // origin string (which no browser will ever send), making the entry a
        // safe no-op rather than an inadvertent attack surface.
        services.AddCors(o => o.AddPolicy(PolicyName, p => p
            .WithOrigins(origins)
            .WithMethods("GET", "POST", "OPTIONS")
            .WithHeaders("Content-Type")));

        return services;
    }
}
