using System;
namespace ScheduleAPI.Entities
{
    public class StudentLecture
    {
        public int StudentId { get; set; }
        public Student Student { get; set; }

        public int LectureId { get; set; }
        public Lecture Lecture { get; set; }
    }
}
