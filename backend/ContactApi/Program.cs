using ContactApi.Data;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default"))
        .UseSnakeCaseNamingConvention());

var app = builder.Build();

app.MapGet("/api/health", () => Results.Ok(new { ok = true, service = "ContactAPI" }))
    .WithName("HealthCheck")
    .WithTags("HealthCheck");

app.Run();