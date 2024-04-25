import LayoutWebsite from "@/components/layouts/LayoutWebsite";
import DetailCourseController from "@/pages/detail_course/DetailCourseController";
import FeaturedArticleController from "@/pages/featured_article/FeaturedArticleController";
import HomeController from "@/pages/home/HomeController";
import LearningController from "@/pages/learning/LearningController";
import LearningRoadmapController from "@/pages/learning_roadmap/LearningRoadmapController";
import WiteBlogPostController from "@/pages/wite_blog_post/WiteBlogPostController";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutWebsite />}>
          <Route path='' element={<HomeController />} />
          <Route path='courses' element={<DetailCourseController />} />
          <Route path='learning_roadmap' element={<LearningRoadmapController />} />
          <Route path='article' element={<FeaturedArticleController />} />
          <Route path='posts' element={<WiteBlogPostController />} />
        </Route>
        <Route path="/learning" element={<LearningController/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
