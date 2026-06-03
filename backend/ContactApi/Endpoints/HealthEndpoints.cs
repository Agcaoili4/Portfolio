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

        app.MapGet("/api/health/ready", async (AppDbContext db, CancellationToken ct) =>
        {
            try
            {
                await db.Database.ExecuteSqlRawAsync("SELECT 1", ct);
                return Results.Ok(new { ok = true, db = "up" });
            }
            catch (Exception ex)
            {
                return Results.Json(
                    new { ok = false, db = "down", error = ex.Message },
                    statusCode: 503);
            }
        })
        .WithName("ReadinessCheck")
        .WithTags("Health");

        return app;
    }
}
