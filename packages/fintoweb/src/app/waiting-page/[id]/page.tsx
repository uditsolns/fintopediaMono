import WaitingPage from "../page";

const WaitingPageWrapper = ({ params }) => {
  const { id } = params; 
  return <WaitingPage id={id} />;
};

export default WaitingPageWrapper;
