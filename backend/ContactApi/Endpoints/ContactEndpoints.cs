using ContactApi.Models.Dtos;
using ContactApi.Services;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace ContactApi.Endpoints;

public static class ContactEndpoints
{
    public static IEndpointRouteBuilder MapContactEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/contact", async (
            [FromBody] ContactRequestDto dto,
            IValidator<ContactRequestDto> validator,
            IContactService service,
            HttpContext http,
            CancellationToken ct) =>
        {
            var validation = await validator.ValidateAsync(dto, ct);
            if (!validation.IsValid)
            {
                return Results.ValidationProblem(validation.ToDictionary());
            }

            var ip = http.Connection.RemoteIpAddress?.ToString();
            var ua = http.Request.Headers.UserAgent.ToString();

            var result = await service.SubmitAsync(dto, ip, ua, ct);
            return result.Success
                ? Results.Ok(result.Response)
                : Results.BadRequest(new { error = result.FailureReason });
        })
        .WithName("SubmitContact")
        .WithTags("Contact");

        return app;
    }
}
