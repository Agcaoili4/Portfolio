using ContactApi.Data;
using ContactApi.Endpoints;
using ContactApi.Infrastructure;
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

builder.Services.AddProblemDetails();
builder.Services.AddFrontendCors(builder.Configuration);
builder.Services.AddContactRateLimiting();

var app = builder.Build();

if (!app.Environment.IsEnvironment("Testing"))
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseExceptionHandler();
app.UseStatusCodePages();
app.UseForwardedHeaders();
app.UseRateLimiter();
app.UseCors(CorsSetup.PolicyName);

app.MapHealthEndpoints();
app.MapContactEndpoints();

app.Run();

public partial class Program { }
