"use client";

import React from "react";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import OngoingMolecule from "@src/components/molecules/MycoursesMolecule/OngoingMolecule";

const Ongoing = () => {
  const { courses } = useAppSelector((state) => state.courses);
  return (
    <div>
      {courses.map((course, index) => {
        return <OngoingMolecule key={index} course={course} />;
      })}
    </div>
  );
};

export default Ongoing;
