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
import { useRouter } from "next/navigation";
import { getUserCertificate } from "shared/src/provider/store/services/UserCertificate.service";
import { getOngoingCourseStatus } from "shared/src/provider/store/services/ongoing-courses-status.service";
import { getCompletionPercentage } from "shared/src/provider/store/services/completion-percentage.service";

const MyCoursesPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { auth } = useAppSelector((state) => state.auth);
  const token = auth?.token;
  const { loading: coursesSavelaterLoading } = useAppSelector(
    (state) => state.coursesSaveLater
  );
  const { loading: courseLoading } = useAppSelector((state) => state.courses);
  const { loading: userCertificateLoading } = useAppSelector(
    (state) => state.userCertificate
  );
  const { loading: ongoingCourseStatusLoading } = useAppSelector(
    (state) => state.ongoingCourseStatus
  );
  const { completion_percentage, loading: completion_percentage_loading } =
    useAppSelector((state) => state.completionPercentage);

  console.log("completion_percentage", completion_percentage);

  React.useEffect(() => {
    if (token) {
      dispatch(getCourses());
      dispatch(getCoursesSaveLater());
      dispatch(getUserCertificate());
      dispatch(getOngoingCourseStatus());
      dispatch(getCompletionPercentage());
    }
  }, []);

  React.useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);

  return (
    <>
      {coursesSavelaterLoading?.courses_save_later ||
      courseLoading?.courses ||
      userCertificateLoading?.userCertificate ||
      ongoingCourseStatusLoading?.ongoing_courses_status ||
      completion_percentage_loading?.completion_percentage ? (
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
