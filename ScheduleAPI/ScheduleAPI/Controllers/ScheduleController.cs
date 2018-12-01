using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ScheduleAPI.Services;
using ScheduleAPI.Entities;
using Microsoft.AspNetCore.Cors;
using System;

namespace ScheduleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowSpecificOrigin")]
    public class ScheduleController : ControllerBase
    {
        private readonly ScheduleDbContext _context;

        public ScheduleController(ScheduleDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetLectures()
        {
            return Ok(_context.Lectures.OrderBy(l => l.WeekDay).ThenBy(l => l.Hour).ThenBy(l => l.Minute));
        }

        [HttpGet("{id}", Name = "GetLecture")]
        public ActionResult<Lecture> GetById(long id)
        {
            var item = _context.Lectures.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPost]
        public IActionResult CreatLecture(Lecture item)
        {
            _context.Lectures.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetLecture", new { id = item.LectureId }, item);
        }

        [HttpPost]
        [Route("/api/schedule/new-student")]
        [EnableCors("AllowSpecificOrigin")] 
        public IActionResult CreateStudent(Student item)
        {
            _context.Students.Add(item);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut("{id}")]
        [EnableCors("AllowSpecificOrigin")]
        public IActionResult Update(int id, Lecture item)
        {
            var lecture = _context.Lectures.Find(id);
            if (lecture == null)
            {
                return NotFound();
            }
            lecture.Code = item.Code;
            lecture.Name = item.Name;
            lecture.Teacher = item.Teacher;
            lecture.Hour = item.Hour;
            lecture.Minute = item.Minute;
            lecture.WeekDay = item.WeekDay;
            lecture.LengthHour = item.LengthHour;
            lecture.LengthMinute = item.LengthMinute;
            _context.Lectures.Update(lecture);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [EnableCors("AllowSpecificOrigin")]
        public IActionResult Delete(int id)
        {
            var lecture = _context.Lectures.Find(id);
            if (lecture == null)
            {
                return NotFound();
            }

            _context.Lectures.Remove(lecture);
            _context.SaveChanges();
            return NoContent();
        }
        [HttpGet]
        [Route("/api/schedule/{weekDay}/{hour}/{minute}")]
        [EnableCors("AllowSpecificOrigin")]
        public IActionResult GetByTime(string weekDay, string hour, string minute)
        {
            var lectures = _context.Lectures.Where(Lecture =>
                      (Lecture.WeekDay.Equals(Enum.Parse(typeof(WeekDay), weekDay))
                       && Lecture.Hour.Equals(Int32.Parse(hour))
                       && Lecture.Minute.Equals(Int32.Parse(minute))));
            return lectures != null && lectures.Count() > 0 ? Ok(lectures.First()) : (IActionResult)NotFound();
        }
        [HttpGet]
        [Route("/api/schedule/students/{lId}")]
        [EnableCors("AllowSpecificOrigin")]
        public IActionResult GetLectureStudents(int lId)
        {
            var students = _context.Students.Where(s => s.StudentLectures.Any(sl => sl.LectureId == lId));
            return students != null&& students.Count() > 0 ? Ok(students) : (IActionResult)NotFound();
        }

        [HttpPost]
        [Route("/api/schedule/assign/{lId}/{sId}")]
        [EnableCors("AllowSpecificOrigin")]
        public IActionResult AssignStudent(int lId, int sId)
        {
            Student stud = _context.Students.Find(sId);
            Lecture lect = _context.Lectures.Find(lId);
            StudentLecture studentLecture = new StudentLecture(sId, lId);
            _context.StudentLectures.Add(studentLecture);
            _context.SaveChanges();

            return Ok();
        }
    }
}