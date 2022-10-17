import { hasConflict, courseConflict, getCourseTerm, terms} 
from '../utilities/times';
import {setData, useData, useUserState} from '../utilities/firebase.js';


const toggle = (x, lst) => (
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);
  
const getCourseNumber = course => (
    course.id.slice(1, 4)
);

//uses timeParts so we should import from App.js
const getCourseMeetingData = course => {
    const meets = prompt('Enter meeting data: MTuWThF hh:mm-hh:mm', course.meets);
    console.log(meets)
    const valid = /[M|Tu|W|Th|F]+ [0-1][0-9]:[0-9][0-9]-[0-1][0-9]:[0-9][0-9]/gm.test(meets);
    console.log(valid)
    //const valid = !meets|| timeParts(meets).days;
    if (valid) {
      return meets;
    } else {
        alert('Invalid meeting data');
        return null;
    }
};

const reschedule = async (course, meets) => {
    if (meets && window.confirm(`Change ${course.id} to ${meets}?`)) {
      try {
        setData(`/courses/${course.id}/meets`, meets);
      } catch (error) {
        alert(error);
      }
    }
};

//double clicking course only changes meeting time if you are logged in
const Course = ({ course, selected, setSelected }) => {
    const isSelected = selected.includes(course);
    const isDisabled = !isSelected && hasConflict(course, selected);
    const [user] = useUserState();
    const style = {
      backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightblue' : 'white'
    };
  
    return (
      <div className="card m-1 p-2" 
          style={style}
          onClick={(isDisabled) ? null : () => setSelected(toggle(course, selected))}
          onDoubleClick={!user ? null : () => reschedule(course, getCourseMeetingData(course))}>
        <div className="card-body">
          <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
          <div className="card-text">{ course.title }</div>
          <div className="card-text">{ course.meets }</div>
        </div>
      </div>
    );
};

export default Course;