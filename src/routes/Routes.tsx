import PrivateRouter from "@/components/PrivateRouter";
import LayoutAdmin from "@/components/layouts/LayoutAdmin";
import LayoutWebsite from "@/components/layouts/LayoutWebsite";
import { useLocalStorage } from "@/hooks/useStorage";
import CategoriesController from "@/pages/admin/categories/CategoriesController";
import CoursesController from "@/pages/admin/courses/CoursesController";
import LessonController from "@/pages/admin/lesson/LessonController";
import PermissionController from "@/pages/admin/permission/PermissionController";
import PostController from "@/pages/admin/post/PostController";
import RoleController from "@/pages/admin/role/RoleController";
import RolePermissionController from "@/pages/admin/role_permission/RolePermissionController";
import SubLessonController from "@/pages/admin/sublesson/SubLessonController";
import UserController from "@/pages/admin/user/UserController";
import Cv from "@/pages/client/Cv";
import DetailBlogController from "@/pages/client/detail_blog/DetailBlogController";
import DetailCourseController from "@/pages/client/detail_course/DetailCourseController";
import FeaturedArticleController from "@/pages/client/featured_article/FeaturedArticleController";
import HomeController from "@/pages/client/home/HomeController";
import LearningController from "@/pages/client/learning/LearningController";
import LearningRoadmapController from "@/pages/client/learning_roadmap/LearningRoadmapController";
import MyArticleController from "@/pages/client/my_article/MyArticleController";
import PageNotFound from "@/pages/client/page_not_found/PageNotFound";
import ProfileController from "@/pages/client/profile/ProfileController";
import SettingProfileController from "@/pages/client/setting_profile/SettingProfileController";
import WiteBlogPostController from "@/pages/client/wite_blog_post/WiteBlogPostController";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  const [user, setUser] = useLocalStorage("user", {});
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutWebsite />}>
          <Route path='' element={<HomeController />} />
          <Route path='courses/:id' element={<DetailCourseController />} />
          <Route
            path='learning_roadmap'
            element={<LearningRoadmapController />}
          />
          <Route path='article' element={<FeaturedArticleController />} />
          <Route path='posts' element={<WiteBlogPostController />} />
          <Route path='profile' element={<PrivateRouter user={user.data}><ProfileController /></PrivateRouter>} />
          <Route path='my_article' element={<PrivateRouter user={user.data}><MyArticleController /></PrivateRouter>} />
          <Route path='setting' element={<PrivateRouter user={user.data}><SettingProfileController /></PrivateRouter>} />
        <Route path='/detail_blog/:id' element={<DetailBlogController />} />
        <Route path='/cv' element={<Cv />} />
        
        </Route>
        <Route path='/learning/:id' element={<PrivateRouter user={user.data}><LearningController /></PrivateRouter>} />
        <Route path='/dashboard' element={<PrivateRouter user={user.data}><LayoutAdmin /></PrivateRouter>}>
          <Route path='courses' element={<CoursesController />} />
          <Route path='lesson' element={<LessonController />} />
          <Route path='sublesson' element={<SubLessonController />} />
          <Route path='categories' element={<CategoriesController />} />
          <Route path='post' element={<PostController />} />
          <Route path='role' element={<RoleController />} />
          <Route path='permission' element={<PermissionController />} />
          <Route path='role_permission' element={<RolePermissionController />} />
          <Route path='user' element={<UserController />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
