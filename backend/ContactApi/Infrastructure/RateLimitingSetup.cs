using System.Net;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.RateLimiting;
using IPNetwork = Microsoft.AspNetCore.HttpOverrides.IPNetwork;

namespace ContactApi.Infrastructure;

public static class RateLimitingSetup
{
    public const string ContactPolicy = "contact";

    public static IServiceCollection AddContactRateLimiting(this IServiceCollection services)
    {
        services.AddRateLimiter(o =>
        {
            o.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

            // Per-IP limit (catches "one bot, many requests")
            o.AddPolicy(ContactPolicy, ctx =>
                RateLimitPartition.GetFixedWindowLimiter(
                    partitionKey: ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                    factory: _ => new FixedWindowRateLimiterOptions
                    {
                        PermitLimit = 5,
                        Window = TimeSpan.FromMinutes(10),
                        QueueLimit = 0
                    }));

            // Global limit (catches "many spoofed IPs, many requests")
            // Sits on top of per-IP so an attacker rotating X-Forwarded-For
            // values still can't exceed this absolute ceiling. Sized at 60/10min
            // which is ~6/min — vastly higher than realistic portfolio traffic
            // but caps obvious flooding regardless of source IP claims.
            o.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(_ =>
                RateLimitPartition.GetFixedWindowLimiter("__global", _ =>
                    new FixedWindowRateLimiterOptions
                    {
                        PermitLimit = 60,
                        Window = TimeSpan.FromMinutes(10),
                        QueueLimit = 0
                    }));
        });

        // Forwarded headers: only trust X-Forwarded-For when it arrives from
        // a private-network address (Render's internal LB). External clients
        // cannot have private-range source IPs, so this prevents X-Forwarded-For
        // spoofing for rate-limit-bypass purposes.
        services.Configure<ForwardedHeadersOptions>(o =>
        {
            o.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            o.ForwardLimit = 1;
            o.KnownNetworks.Clear();
            o.KnownProxies.Clear();
            o.KnownNetworks.Add(new IPNetwork(IPAddress.Parse("10.0.0.0"), 8));
            o.KnownNetworks.Add(new IPNetwork(IPAddress.Parse("172.16.0.0"), 12));
            o.KnownNetworks.Add(new IPNetwork(IPAddress.Parse("192.168.0.0"), 16));
        });

        return services;
    }
}
