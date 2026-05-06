using ContactTracking.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactTracking.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<ContactSubmission> ContactSubmissions { get; set; }
        public DbSet<FoodSubmission> FoodSubmissions { get; set; }
        public DbSet<MainSubmission> MainSubmissions { get; set; }
    }
}