using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ScheduleAPI.Entities
{
    public enum WeekDay
    {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }
    public class Lecture
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LectureId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Teacher { get; set; }
        public WeekDay? WeekDay { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int LengthHour { get; set; }
        public int LengthMinute { get; set; }
        public virtual IList<StudentLecture> StudentLectures { get; set; }

    }
}