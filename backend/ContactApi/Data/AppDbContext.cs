using ContactApi.Models.Entities;
using Microsoft.EntityFrameworkCore;

// The AppDbContext class inherits from DbContext which represents a session with database
namespace ContactApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    // Represents the ContactSubmissions table in DB
    public DbSet<ContactSubmission> ContactSubmissions => Set<ContactSubmission>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<ContactSubmission>();

        entity.ToTable("contact_submissions");
        entity.HasKey(x => x.Id);
        entity.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");

        entity.Property(x => x.Name).IsRequired().HasMaxLength(255);
        entity.Property(x => x.Email).IsRequired().HasMaxLength(255);
        entity.Property(x => x.Message).IsRequired();
        entity.Property(x => x.SubmittedAt).HasDefaultValueSql("NOW()");
        entity.Property(x => x.UserAgent).HasMaxLength(512);

        entity.HasIndex(x => x.SubmittedAt).IsDescending();
    }

}
