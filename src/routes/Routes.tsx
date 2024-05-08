import LayoutAdmin from "@/components/layouts/LayoutAdmin";
import LayoutWebsite from "@/components/layouts/LayoutWebsite";
import CategoriesController from "@/pages/admin/categories/CategoriesController";
import CoursesController from "@/pages/admin/courses/CoursesController";
import LessonController from "@/pages/admin/lesson/LessonController";
import SubLessonController from "@/pages/admin/sublesson/SubLessonController";
import DetailCourseController from "@/pages/client/detail_course/DetailCourseController";
import FeaturedArticleController from "@/pages/client/featured_article/FeaturedArticleController";
import HomeController from "@/pages/client/home/HomeController";
import LearningController from "@/pages/client/learning/LearningController";
import LearningRoadmapController from "@/pages/client/learning_roadmap/LearningRoadmapController";
import MyArticleController from "@/pages/client/my_article/MyArticleController";
import ProfileController from "@/pages/client/profile/ProfileController";
import SettingProfileController from "@/pages/client/setting_profile/SettingProfileController";
import WiteBlogPostController from "@/pages/client/wite_blog_post/WiteBlogPostController";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutWebsite />}>
          <Route path='' element={<HomeController />} />
          <Route path='courses' element={<DetailCourseController />} />
          <Route
            path='learning_roadmap'
            element={<LearningRoadmapController />}
          />
          <Route path='article' element={<FeaturedArticleController />} />
          <Route path='posts' element={<WiteBlogPostController />} />
          <Route path='profile' element={<ProfileController />} />
          <Route path='my_article' element={<MyArticleController />} />
          <Route path='setting' element={<SettingProfileController />} />
        </Route>
        <Route path='/learning' element={<LearningController />} />
        <Route path='/dashboard' element={<LayoutAdmin />}>
          <Route path='courses' element={<CoursesController />} />
          <Route path='lesson' element={<LessonController />} />
          <Route path='sublesson' element={<SubLessonController />} />
          <Route path='categories' element={<CategoriesController />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
