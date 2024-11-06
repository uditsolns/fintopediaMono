import CourseEnrollDetails from "../page";

const CourseEnrollDetailsWrapper = ({ params }) => {
  const { id } = params; 
  return <CourseEnrollDetails id={id} />;
};

export default CourseEnrollDetailsWrapper;
