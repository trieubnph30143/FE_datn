import React, { useState } from "react";
import HomeView from "./HomeView";
import { useQuery } from "react-query";
import { getCourses } from "@/service/courses";
import { getUserProgress } from "@/service/progress";
import { useCoursesContext } from "@/App";
import { useNavigate } from "react-router";
import { getPostActive } from "@/service/post";

type Props = {};

const HomeController = (props: Props) => {
  const context: any = useCoursesContext();
  const { data: courses } = useQuery("courses", {
    queryFn: () => getCourses(),
  });

  
  const navigate = useNavigate()
  const { data: post } = useQuery(["post_active"], {
    queryFn: () => {
     
      return getPostActive({page:0,limit:4});
    },
    refetchOnWindowFocus: false,
  });
  console.log(post);
  return (
    <>
      <HomeView
        progress={context.state.progress !== undefined && context.state.progress[0]  && context.state.progress}
        courses={courses && courses}
        post={post&&post.data}
      />
    </>
  );
};

export default HomeController;
