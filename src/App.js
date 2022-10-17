import './App.css';
import React from 'react';
//import { hasConflict, courseConflict, getCourseTerm, terms} from './utilities/times.js';
import { useDbData } from './utilities/firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dispatcher from "./components/Dispatcher";
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};

const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const Main = () => {
  const [data, error] = useDbData('/');
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (!data) return <h1>No user data found</h1>;

  console.log(data)
  return (
    <div className="container">
      <Banner title={ data.title } />
      <Dispatcher courses={data.courses}/>
    </div>
  );
}


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
);



export default App;