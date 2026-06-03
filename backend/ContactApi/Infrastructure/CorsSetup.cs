namespace ContactApi.Infrastructure;

public static class CorsSetup
{
    public const string PolicyName = "frontend";

    public static IServiceCollection AddFrontendCors(this IServiceCollection services, IConfiguration config)
    {
        var origins = (config["AllowedOrigins"] ?? "")
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        services.AddCors(o => o.AddPolicy(PolicyName, p => p
            .WithOrigins(origins)
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .WithMethods("GET", "POST", "OPTIONS")
            .WithHeaders("Content-Type")));

        return services;
    }
}
