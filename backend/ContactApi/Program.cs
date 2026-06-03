using ContactApi.Data;
using ContactApi.Services;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default"))
        .UseSnakeCaseNamingConvention());

builder.Services.AddValidatorsFromAssemblyContaining<ContactApi.Validators.ContactRequestValidator>();

builder.Services.AddHttpClient<IEmailSender, ResendEmailSender>();
builder.Services.AddHttpClient<ITurnstileVerifier, TurnstileVerifier>();
builder.Services.AddScoped<IContactService, ContactService>();

var app = builder.Build();

if (!app.Environment.IsEnvironment("Testing"))
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.MapGet("/api/health", () => Results.Ok(new { ok = true, service = "ContactAPI" }))
    .WithName("HealthCheck")
    .WithTags("HealthCheck");

app.Run();
