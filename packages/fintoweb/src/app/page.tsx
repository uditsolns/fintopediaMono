"use client";
import * as React from "react";
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
import { getCourses } from "shared/src/provider/store/services/courses.service";
import { getCategories } from "shared/src/provider/store/services/categories.service";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import { getCourseCart } from "shared/src/provider/store/services/CourseCart.service";
import AchiveingSliderMolecule from "@src/components/molecules/AchiveingSliderMolecule/AchiveingSliderMolecule";
import { getCourseReviews } from "shared/src/provider/store/services/course-review.service";
import { getCoursesgetPurchase } from "shared/src/provider/store/services/coursesget-purchase.service";

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
  const { course_review, loading: coursesReviewLoading } = useAppSelector(
    (state) => state.courseReviews
  );
  const { courseget_purchase, loading: coursesgetPurchaseLoading } =
    useAppSelector((state) => state.coursesgetPurchase);
  console.log("🚀 ~ page ~ courseget_purchase:", courseget_purchase);
  React.useEffect(() => {
    if (token) {
      dispatch(getCourseCart());
      dispatch(getCoursesgetPurchase());
    }
  }, [token, dispatch]);

  React.useEffect(() => {
    dispatch(getCourses());
    dispatch(getCategories());
    dispatch(getCourseReviews());
    localStorage.removeItem("transactionId");
    localStorage.removeItem("singlePurchaseHistory");
    localStorage.removeItem("courseCartState");
    localStorage.removeItem("courseCart");
    localStorage.removeItem("paymentStatus");
    localStorage.removeItem("purchaseData");
  }, [dispatch]);
  return (
    <>
      {categoriesLoading?.categories ||
      coursesLoading?.courses ||
      coursesReviewLoading?.course_review ||
      coursesgetPurchaseLoading?.courseget_purchase ? (
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
          <FeaturedCourses
            courses={courses}
            categories={categories}
            label="Featured Courses"
          />
        </div>
        <CategoryBanner categories={categories} />
        <HowitWorks />
        <AchiveingSliderMolecule />
        <CourseOffer />
        <BlogsSlider />
        <BasicStockmarketBanner />
      </div>
    </>
  );
}
