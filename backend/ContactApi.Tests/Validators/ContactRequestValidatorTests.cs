using ContactApi.Models.Dtos;
using ContactApi.Validators;
using FluentValidation.TestHelper;
using Xunit;

namespace ContactApi.Tests.Validators;

public class ContactRequestValidatorTests
{
    private readonly ContactRequestValidator _validator = new();

    private static ContactRequestDto Valid() =>
    new("Jane Doe", "jane@example.com", "Hello, this is okay!", "tok");

    // Test that a valid request passes validation
    [Fact]
    public void Valid_request_passes()
    {
        // Act & Assert
        _validator.TestValidate(Valid()).ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Empty_name_fails()
    {
        _validator.TestValidate(Valid() with { Name = "" })
            .ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Name_over_255_fails()
    {
        _validator.TestValidate(Valid() with { Name = new string('a', 121) })
            .ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Invalid_email_fails()
    {
        _validator.TestValidate(Valid() with { Email = "not-an-email" })
            .ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Fact]
    public void Message_under_10_chars_fails()
    {
        _validator.TestValidate(Valid() with { Message = "short" })
            .ShouldHaveValidationErrorFor(x => x.Message);
    }

    [Fact]
    public void Message_over_5000_fails()
    {
        _validator.TestValidate(Valid() with { Message = new string('a', 5001) })
            .ShouldHaveValidationErrorFor(x => x.Message);
    }

    [Fact]
    public void Empty_turnstile_token_fails()
    {
        _validator.TestValidate(Valid() with { TurnstileToken = "" })
            .ShouldHaveValidationErrorFor(x => x.TurnstileToken);
    }
}