const meetTime = (time) => {
  const time1 = time.substring(time.search(' ') + 1, time.search('-'));
  const time2 = time.substring(time.search('-') + 1);
  return {
      "days": time.substring(0, time.search(' ')),
      "hours": {
          "start": {
              "h": parseInt(time1.substring(0, time1.search(':'))),
              "m": parseInt(time1.substring(time1.search(':') + 1)),
          },
          "end": {
              "h": parseInt(time2.substring(0, time.search(':'))),
              "m": parseInt(time2.substring(time2.search(':') + 1)),
          }
      }
  }
}


const days = ['M', 'Tu', 'W', 'Th', 'F'];

export const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

export const getCourseTerm = course => (
    terms[course?.id ? course.id.charAt(0) : "null"]
  );

//course conflict functions

const daysOverlap = (days1, days2) => ( 
  days.some(day => days1.includes(day) && days2.includes(day))
);


const timeGreater = (hours1, hours2) => (
  hours1.h > hours2.h || (hours1.h === hours2.h && hours1.m >= hours2.m)
);

const hoursOverlap = (hours1, hours2) => (
  timeGreater(hours1.end, hours2.start) && timeGreater(hours2.end, hours1.start)
);
const timeConflict = (course1, course2) => (
  daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
);



const courseConflict = (course1, course2) => (
  course1.term === course2.term
  && timeConflict(meetTime(course1.meets), meetTime(course2.meets))
);


export const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);