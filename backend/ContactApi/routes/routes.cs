namespace ContactApi.routes;

public static class Routes
{
    // IEndpointRouteBuilder is the interface for building routes in ASP.NET Core
    public static IEndpointRouteBuilder MapApiRoutes(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("/api").WithTags("API");

        // Getting the health of the API, making sure that it's wired successfully and can respond to requests
        api.MapGet("/health", () => Results.Ok(new { ok = true, service = "ContactAPI" }))
            .WithName("HealthCheck");


        api.MapPost("/contact", async (ContactRequest request) =>
        {
            if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Message))
            {
                return Results.BadRequest(new { error = "Name, Email, and Message are required." });
            }

            return Results.Ok(new
            {
                success = true,
                message = "Contact request received successfully."
            });
        })
        .WithName("SubmitContactRequest");
        return app;
    }

    // Sealed class to represent the contact request payload
    // Class is sealed to prevent it being a main class for inheritance, only used for data transfer 
    public sealed class ContactRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}

