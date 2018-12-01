using Microsoft.EntityFrameworkCore;
using ScheduleAPI.Entities;
namespace ScheduleAPI.Services
{
    public class ScheduleDbContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudentLecture>()
                .HasKey(bc => new { bc.StudentId, bc.LectureId });

            modelBuilder.Entity<StudentLecture>()
                .HasOne(bc => bc.Student)
                .WithMany(b => b.StudentLectures)
                .HasForeignKey(bc => bc.StudentId);

            modelBuilder.Entity<StudentLecture>()
                .HasOne(bc => bc.Lecture)
                .WithMany(c => c.StudentLectures)
                .HasForeignKey(bc => bc.LectureId);
        }

        public DbSet<Lecture> Lectures { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<StudentLecture> StudentLectures { get; set; }

        public ScheduleDbContext(DbContextOptions<ScheduleDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }


    }
}