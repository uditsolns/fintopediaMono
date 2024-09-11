import dynamic from "next/dynamic";
import Banner from "./homepage/Banner";
import GamesPage from "./games/page";
import StocksSlider from "./homepage/StocksSlider";
import QuizSection from "./homepage/QuizSection";
import FeaturedCourses from "./homepage/FeaturedCourses";
import HowitWorks from "./homepage/HowitWorks";
import CategoryBanner from "./homepage/CategoryBanner";
import AchiveingLearningSlider from "./homepage/AchiveingLearningSlider";
import CourseOffer from "./homepage/CourseOffer";
import BlogsSlider from "./homepage/BlogsSlider";
import BasicStockmarketBanner from "./homepage/BasicStockmarketBanner";

// const Homepage = dynamic(() => import("./homepage/Homepage"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });
// const GamesPage = dynamic(() => import("./games/page"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });

export default function Home() {
  return (
    <div>
      <Banner />
      <StocksSlider />
      <QuizSection />
      <div>
        <h2 className="Heading">Featured Courses</h2>
        <FeaturedCourses />
      </div>

      <CategoryBanner />
      <HowitWorks />
      <AchiveingLearningSlider />
      <CourseOffer />
      <BlogsSlider />
      <BasicStockmarketBanner />
      {/* game */}
      {/* <GamesPage /> */}
    </div>
  );
}
