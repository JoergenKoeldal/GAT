#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GatApi.Models;

namespace GatApi.Data
{
    public class GatApiContext : DbContext
    {
        public GatApiContext (DbContextOptions<GatApiContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<KeywordListHasKeyword>()
                .HasKey(klhk => new { klhk.KeywordId, klhk.KeywordListId });

            modelBuilder.Entity<UserFinishedSchedule>()
                .HasKey(ufs => new { ufs.ScheduleId, ufs.UserId});
         
        }

        public DbSet<Department> Department { get; set; }
        public DbSet<KeywordListHasKeyword> KeywordListHasKeywords { get; set; }
        public DbSet<Keyword> Keyword { get; set; }
        public DbSet<KeywordList> KeywordList { get; set; }
        public DbSet<Cleanup> Cleanup { get; set; }
        public DbSet<Schedule> Schedule { get; set; }
        public DbSet<Source> Source { get; set; }
        public DbSet<UserFinishedSchedule> UserFinishedSchedule { get; set; }
        public DbSet<User> User { get; set; }

    }
}
