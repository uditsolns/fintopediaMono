import React from "react";
import { BsChevronRight } from "react-icons/bs";

interface NextArrowProps {
  onClick?: () => void; 
}

const NextArrow: React.FC<NextArrowProps> = ({ onClick }) => {
  return (
    <div className="absolute right-0 -top-[30px]" onClick={onClick}>
      <div className="bg-[#72727a] h-[30px] w-[30px] rounded-full grid place-items-center cursor-pointer">
        <BsChevronRight />
      </div>
    </div>
  );
};

export default NextArrow;