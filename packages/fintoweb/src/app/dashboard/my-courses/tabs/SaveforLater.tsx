import React from "react";
import SaveforLaterMolecule from "@src/components/molecules/SaveforLaterMolecule/SaveforLaterMolecule";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";

const SaveforLater = () => {
  const { courses_save_later } = useAppSelector(
    (state) => state.coursesSaveLater
  );

  return (
    <div>
      {courses_save_later.map((course) => (
        <SaveforLaterMolecule
          key={course.id}
          course={course}
          // loading={loadingCourseId === course.id}
          // onClick={() => handleCourseClick(course)}
        />
      ))}
    </div>
  );
};

export default SaveforLater;
