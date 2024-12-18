"use client";

import React from "react";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import OngoingMolecule from "@src/components/molecules/MycoursesMolecule/OngoingMolecule";

const Ongoing = () => {
  const { courses } = useAppSelector((state) => state.courses);
  const { ongoing_courses_status } = useAppSelector(
    (state) => state.ongoingCourseStatus
  );
  console.log("ongoing_courses_status", ongoing_courses_status);
  return (
    <div>
      {ongoing_courses_status?.map((course) => {
        return <OngoingMolecule course={course?.ongoing?.course} />;
      })}
    </div>
  );
};

export default Ongoing;
