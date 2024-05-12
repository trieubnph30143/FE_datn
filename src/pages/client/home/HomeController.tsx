import React from "react";
import HomeView from "./HomeView";
import { useQuery } from "react-query";
import { getCourses } from "@/service/courses";

type Props = {};

const HomeController = (props: Props) => {
  const { data: courses } = useQuery("courses", {
    queryFn: () => getCourses(),
  });

  return (
    <>
      <HomeView courses={courses && courses} />
    </>
  );
};

export default HomeController;
