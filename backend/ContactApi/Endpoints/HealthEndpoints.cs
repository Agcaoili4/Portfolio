using ContactApi.Data;
using Microsoft.EntityFrameworkCore;

namespace ContactApi.Endpoints;

public static class HealthEndpoints
{
    public static IEndpointRouteBuilder MapHealthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/health", () => Results.Ok(new { ok = true, service = "ContactAPI" }))
            .WithName("HealthCheck")
            .WithTags("Health");

        app.MapGet("/api/health/ready", async (
            AppDbContext db,
            ILoggerFactory loggerFactory,
            CancellationToken ct) =>
        {
            var logger = loggerFactory.CreateLogger("HealthCheck");
            try
            {
                await db.Database.ExecuteSqlRawAsync("SELECT 1", ct);
                return Results.Ok(new { ok = true, db = "up" });
            }
            catch (Exception ex)
            {
                // Log the detail server-side; never return the exception to the
                // caller, which would leak connection string fragments (host,
                // port, role) to anyone polling the endpoint.
                logger.LogError(ex, "Readiness probe failed: database not reachable");
                return Results.Json(new { ok = false, db = "down" }, statusCode: 503);
            }
        })
        .WithName("ReadinessCheck")
        .WithTags("Health");

        return app;
    }
}
