using System.Collections.Generic;
using System.Linq;
using ScheduleAPI.Entities;

namespace ScheduleAPI.Services
{
    public static class ScheduleDbContextExtensions
    {
        public static void CreateSeedData(this ScheduleDbContext context)
        {
            if (!context.Lectures.Any()) {
                var lectures = new List<Lecture>()
               {
                    new Lecture{Code="T120B410",Name="Cloud Computing",Teacher="Jeff",WeekDay=WeekDay.Friday,Hour=15,Minute=30,LengthHour=1,LengthMinute=0},
                    new Lecture{Code="T120B450",Name="Server Administration",Teacher="Alex",WeekDay=WeekDay.Monday,Hour=9,Minute=0,LengthHour=0,LengthMinute=30},
                    new Lecture{Code="S210D010",Name="Psychology",Teacher="Taira",WeekDay=WeekDay.Tuesday,Hour=13,Minute=30,LengthHour=1,LengthMinute=30},
                    new Lecture{Code="T120B900",Name="Computer Security",Teacher="Alonzo",WeekDay=WeekDay.Thursday,Hour=11,Minute=0,LengthHour=1,LengthMinute=0},
               };
                context.AddRange(lectures);
                context.SaveChanges();
            }

            if (!context.Students.Any()){
                var students = new List<Student>()
               {
                    new Student{StudentName="Tommy Jefferson"},
                    new Student{StudentName="Harry Frot"},
                    new Student{StudentName="Ash Monte"},
                    new Student{StudentName="Ted Stroming"},
               };

                context.AddRange(students);
                context.SaveChanges();
            }
            //if (!context.StudentLectures.Any())
            //{
            //    var studentLectures = new List<StudentLecture>()
            //   {
            //        new StudentLecture{LectureId=1,StudentId=0},
            //        new StudentLecture{LectureId=3,StudentId=1}
            //   };
            //    context.AddRange(studentLectures);
            //    context.SaveChanges();
            //}

        }
    }
}