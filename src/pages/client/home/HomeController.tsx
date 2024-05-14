import React from "react";
import HomeView from "./HomeView";
import { useQuery } from "react-query";
import { getCourses } from "@/service/courses";
import { getUserProgress } from "@/service/progress";
import { useCoursesContext } from "@/App";

type Props = {};

const HomeController = (props: Props) => {
  const context: any = useCoursesContext();
  const { data: courses } = useQuery("courses", {
    queryFn: () => getCourses(),
  });
  
  return (
    <>
      <HomeView
        progress={context.state.progress !== undefined && context.state.progress[0]  && context.state.progress}
        courses={courses && courses}
      />
    </>
  );
};

export default HomeController;