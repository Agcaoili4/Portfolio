using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactApi.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "contact_submissions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    message = table.Column<string>(type: "text", nullable: false),
                    submitted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ip_address = table.Column<string>(type: "text", nullable: true),
                    user_agent = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: true),
                    email_sent_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    email_error = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_contact_submissions", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_contact_submissions_submitted_at",
                table: "contact_submissions",
                column: "submitted_at",
                descending: new bool[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "contact_submissions");
        }
    }
}
