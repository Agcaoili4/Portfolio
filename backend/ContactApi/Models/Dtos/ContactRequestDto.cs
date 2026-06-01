namespace ContactApi.Models.Dtos;

public record ContactRequestDto
(
    String Name,
    String Email,
    String Message,
    String TurnstileToken
);
