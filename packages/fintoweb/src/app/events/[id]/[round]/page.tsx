// app/events/[id]/[round]/page.tsx

import Events from "../../page";

const EventWrapper = ({ params }) => {
  const { id, round } = params;
  return <Events id={id} round={round} />;
};

export default EventWrapper;
