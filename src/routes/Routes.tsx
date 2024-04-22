import LayoutWebsite from "@/components/layouts/LayoutWebsite";
import HomeController from "@/pages/home/HomeController";
import { BrowserRouter, Route, Routes } from "react-router-dom"


const Router = () => {
  return (
     <BrowserRouter>
        <Routes>
           <Route path="/" element={<LayoutWebsite/>}>
               <Route path="" element={<HomeController/>} />
           </Route>
         </Routes>
     </BrowserRouter>
  )
}

export default Router;