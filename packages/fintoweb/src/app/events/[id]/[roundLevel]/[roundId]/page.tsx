import Events from "@src/app/events/page";

const EventWrapper = ({ params }) => {
  console.log("params",params)
  const { id, roundLevel, roundId } = params;
  return <Events id={id} roundLevel={roundLevel} roundId={roundId} />;
};

export default EventWrapper;
