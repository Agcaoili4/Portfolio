using ContactApi.Data;
using ContactApi.Endpoints;
using ContactApi.Infrastructure;
using ContactApi.Services;
using FluentValidation;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Finding 7: cap the request body at 64KB. The only POST endpoint takes a
// JSON body whose maximum legitimate size is well under 10KB (5KB message +
// envelope). The Kestrel default of 30MB is a wide-open invitation.
builder.Services.Configure<KestrelServerOptions>(o => o.Limits.MaxRequestBodySize = 64_000);

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

// Finding 6: minimal security headers for every response. Cheap defense in depth.
//   X-Content-Type-Options: prevents MIME-sniffing attacks
//   X-Frame-Options: disallows framing (clickjacking)
//   Referrer-Policy: don't leak full URL paths to third parties
//   Strict-Transport-Security: reinforce HTTPS even past Render's TLS layer
app.Use(async (ctx, next) =>
{
    var h = ctx.Response.Headers;
    h["X-Content-Type-Options"] = "nosniff";
    h["X-Frame-Options"] = "DENY";
    h["Referrer-Policy"] = "no-referrer";
    h["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains";
    await next();
});

app.UseForwardedHeaders();
app.UseRateLimiter();
app.UseCors(CorsSetup.PolicyName);

app.MapHealthEndpoints();
app.MapContactEndpoints();

app.Run();

public partial class Program { }
