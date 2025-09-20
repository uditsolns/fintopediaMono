import React, { useEffect, useState } from "react";

interface OfferCountdownProps {
  offerStartDate: string;
  offerEndDate: string;
}

const OfferCountdown: React.FC<OfferCountdownProps> = ({
  offerStartDate,
  offerEndDate,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const endDate = new Date(offerEndDate?.replace(" ", "T"));
      const startDate = new Date(offerStartDate?.replace(" ", "T"));

      if (now < startDate) {
        setTimeRemaining("Offer has not started yet");
        return;
      }

      const timeDiff = endDate.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setTimeRemaining("Offer has ended");
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };
    calculateTimeRemaining();

    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [offerStartDate, offerEndDate]);

  return (
    <div>
      <h6>Offer ends in : {timeRemaining}</h6>
    </div>
  );
};

export default OfferCountdown;
