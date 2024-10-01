import EventPage from "../page";

const EventWrapper = ({ params }) => {
  const { id } = params; 
  return <EventPage id={id} />;
};

export default EventWrapper;
