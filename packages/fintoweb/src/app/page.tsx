import dynamic from "next/dynamic";
import Banner from "./homepage/Banner";
import GamesPage from "./games/page";
import StocksSlider from "./homepage/StocksSlider";
import QuizSection from "./homepage/QuizSection";
import FeaturedCourses from "./homepage/FeaturedCourses";
import HowitWorks from "./homepage/HowitWorks";

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
      <FeaturedCourses/>
      <HowitWorks/>
      {/* game */}
      <GamesPage />
    </div>
  );
}
