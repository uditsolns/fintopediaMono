import React from "react";
import { BsChevronLeft } from "react-icons/bs";

interface PrevArrowProps {
  onClick?: () => void;
}

const PrevArrow: React.FC<PrevArrowProps> = ({ onClick }) => {
  return (
    <div className="absolute right-[50px] -top-[30px]" onClick={onClick}>
      <div className="bg-[#72727a] h-[30px] w-[30px] rounded-full grid place-items-center cursor-pointer">
        <BsChevronLeft />
      </div>
    </div>
  );
};

export default PrevArrow;
