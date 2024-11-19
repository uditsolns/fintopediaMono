"use client";

import React from "react";
import MyCoursestabs from "./MyCoursestabs";
import { getCourses } from "shared/src/provider/store/services/courses.service";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { getCoursesSaveLater } from "shared/src/provider/store/services/coursesavelater.service";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import CircularLoading from "@src/components/loader/CircularLoading";

const MyCoursesPage = () => {
  const dispatch = useAppDispatch();
  const { courses_save_later, loading: coursesSavelaterLoading } =
    useAppSelector((state) => state.coursesSaveLater);
  const { courses, loading: courseLoading } = useAppSelector(
    (state) => state.courses
  );
  React.useEffect(() => {
    dispatch(getCourses());
    dispatch(getCoursesSaveLater());
  }, []);
  return (
    <>
      {coursesSavelaterLoading?.courses_save_later || courseLoading?.courses ? (
        <div className="d-flex justify-content-center p-5">
          <LoadingAtom />
        </div>
      ) : (
        <div>
          <MyCoursestabs />
        </div>
      )}
    </>
  );
};

export default MyCoursesPage;
