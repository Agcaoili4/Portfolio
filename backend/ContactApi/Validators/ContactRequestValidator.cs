using ContactApi.Models.Dtos;
using FluentValidation;

namespace ContactApi.Validators;

public class ContactRequestValidator : AbstractValidator<ContactRequestDto>
{
    public ContactRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(120);

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Email must be a valid email address.")
            .MaximumLength(254);

        RuleFor(x => x.Message)
            .NotEmpty().WithMessage("Message is required.")
            .MinimumLength(10).WithMessage("Message must be at least 10 characters.")
            .MaximumLength(5000);

        RuleFor(x => x.TurnstileToken)
            .NotEmpty().WithMessage("Bot-protection token missing.");
    }
}
