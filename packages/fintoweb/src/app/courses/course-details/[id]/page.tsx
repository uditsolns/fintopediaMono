import CourseDetails from "../page";

const CourseDetailsWrapper = ({ params }) => {
  const { id } = params; 
  return <CourseDetails id={id} />;
};

export default CourseDetailsWrapper;
