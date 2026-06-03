using System.Net;
using System.Net.Http.Json;
using ContactApi.Data;
using ContactApi.Models.Dtos;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace ContactApi.Tests.Endpoints;

public class ContactEndpointTests : IClassFixture<ApiFactory>, IAsyncLifetime
{
    private readonly ApiFactory _factory;
    private readonly HttpClient _client;

    public ContactEndpointTests(ApiFactory factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    public Task InitializeAsync() => _factory.ResetStateAsync();
    public Task DisposeAsync() => Task.CompletedTask;

    private static ContactRequestDto Valid() =>
        new("Jane Doe", "jane@example.com", "Hello, longer-than-ten chars.", "token");

    [Fact]
    public async Task Valid_submission_returns_200_and_persists_row()
    {
        var resp = await _client.PostAsJsonAsync("/api/contact", Valid());

        resp.StatusCode.Should().Be(HttpStatusCode.OK);

        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var row = await db.ContactSubmissions.AsNoTracking().SingleAsync();
        row.Name.Should().Be("Jane Doe");
        row.EmailSentAt.Should().NotBeNull();
        row.EmailError.Should().BeNull();
        _factory.Email.Sent.Should().ContainSingle(s => s.Email == "jane@example.com");
    }

    [Fact]
    public async Task Invalid_submission_returns_400_and_no_row()
    {
        var resp = await _client.PostAsJsonAsync("/api/contact",
            Valid() with { Email = "not-an-email" });

        resp.StatusCode.Should().Be(HttpStatusCode.BadRequest);

        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        (await db.ContactSubmissions.CountAsync()).Should().Be(0);
        _factory.Email.Sent.Should().BeEmpty();
    }

    [Fact]
    public async Task Failed_turnstile_returns_400_and_no_row()
    {
        _factory.Turnstile.Result = false;

        var resp = await _client.PostAsJsonAsync("/api/contact", Valid());

        resp.StatusCode.Should().Be(HttpStatusCode.BadRequest);

        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        (await db.ContactSubmissions.CountAsync()).Should().Be(0);
        _factory.Email.Sent.Should().BeEmpty();
    }

    [Fact]
    public async Task Email_failure_still_persists_submission_with_error()
    {
        _factory.Email.ThrowOnSend = new InvalidOperationException("simulated outage");

        var resp = await _client.PostAsJsonAsync("/api/contact",
            Valid() with { Name = "EmailFails" });

        resp.StatusCode.Should().Be(HttpStatusCode.OK);

        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var row = await db.ContactSubmissions.AsNoTracking()
                          .SingleAsync(x => x.Name == "EmailFails");
        row.EmailSentAt.Should().BeNull();
        row.EmailError.Should().Contain("simulated outage");
    }

    [Fact]
    public async Task Health_endpoint_returns_200()
    {
        var resp = await _client.GetAsync("/api/health");
        resp.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Ready_endpoint_returns_200_when_db_reachable()
    {
        var resp = await _client.GetAsync("/api/health/ready");
        resp.StatusCode.Should().Be(HttpStatusCode.OK);
    }
}
