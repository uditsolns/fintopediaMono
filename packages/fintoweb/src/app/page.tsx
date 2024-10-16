"use client";
import React from "react";
import dynamic from "next/dynamic";
import Banner from "./homepage/Banner";
import StocksSlider from "./homepage/StocksSlider";
import QuizSection from "./homepage/QuizSection";
import FeaturedCourses from "./homepage/components/featured-courses/FeaturedCourses";
import HowitWorks from "./homepage/HowitWorks";
import CategoryBanner from "./homepage/CategoryBanner";
import AchiveingLearningSlider from "./homepage/AchiveingLearningSlider";
import CourseOffer from "./homepage/CourseOffer";
import BlogsSlider from "./homepage/BlogsSlider";
import BasicStockmarketBanner from "./homepage/BasicStockmarketBanner";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import Login from "./auth/login/page";
import { getCourses } from "shared/src/provider/store/services/courses.service";
import { getCategories } from "shared/src/provider/store/services/categories.service";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import { getCourseCart } from "shared/src/provider/store/services/CourseCart.service";

// const Homepage = dynamic(() => import("./homepage/Homepage"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });
// const GamesPage = dynamic(() => import("./games/page"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });

export default function Home() {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const token = auth?.token;
  const { categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.categories
  );
  const { courses, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );

  React.useEffect(() => {
    if (token) {
      dispatch(getCourses());
      dispatch(getCategories());
      dispatch(getCourseCart());
    }
  }, [token, dispatch]);

  if (token) {
    return (
      <>
        {categoriesLoading?.categories || coursesLoading?.courses ? (
          <div className="fullPageLoading">
            <LoadingAtom
              style={{
                height: "5rem",
                width: "5rem",
              }}
            />
          </div>
        ) : null}
        <div>
          <Banner />
          <StocksSlider />
          <QuizSection />
          <div>
            <FeaturedCourses courses={courses} categories={categories} />
          </div>
          <CategoryBanner categories={categories} />
          <HowitWorks />
          <AchiveingLearningSlider />
          <CourseOffer />
          <BlogsSlider />
          <BasicStockmarketBanner />
        </div>
      </>
    );
  }
  return <Login />;
}
