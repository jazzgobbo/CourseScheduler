import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseList from './CourseList';

const Dispatcher = ({courses}) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CourseList courses={courses} />} />
    </Routes>
  </BrowserRouter>
);

export default Dispatcher;