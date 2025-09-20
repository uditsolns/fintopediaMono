"use client";

import React from "react";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import OngoingMolecule from "@src/components/molecules/MycoursesMolecule/OngoingMolecule";

const Ongoing = () => {
  const { courses } = useAppSelector((state) => state.courses);
  const { ongoing_courses_status } = useAppSelector(
    (state) => state.ongoingCourseStatus
  );
  const { completion_percentage } = useAppSelector(
    (state) => state.completionPercentage
  );
  // console.log("completion_percentage", completion_percentage);

  return (
    <div>
      {ongoing_courses_status?.map((course) => {
        const courseId = course?.ongoing?.course_id;

        const completion = Math.floor(
          completion_percentage?.completion_data?.find(
            (data) => data.course_id === courseId
          )?.completion_percentage || 0
        );

        // console.log("completion", completion);
        return (
          <OngoingMolecule
            key={courseId}
            course={course?.ongoing?.course}
            completionPercentage={completion || 0}
          />
        );
      })}
    </div>
  );
};

export default Ongoing;
