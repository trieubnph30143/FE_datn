import { useQuery } from "react-query";
import DetailCourseView from "./DetailCourseView";
import { getOneCourses } from "@/service/courses";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { addProgress, getProgress } from "@/service/progress";

const DetailCourseController = () => {
  const { id } = useParams();
  const [toggle, setToggle] = useState(true);
  const [totalLesson, setTotalLesson] = useState(0);
  const navigate = useNavigate();
  const [expanded, setExpanded]:any = useState([
  ]);
  const { data: courses } = useQuery("detail", {
    queryFn: () => {
      return getOneCourses(id && id);
    },
    onSuccess(data) {
     setExpanded([ true,
      ...Array( data.lesson.length).fill(false),])
      let total = 0;
      data.lesson.map((item: any) => (total += item.sub_lesson.length));
      setTotalLesson(total);
    },
  });

  

  const handleTongle = (index: number) => {
    setExpanded((prevExpanded:any) =>
      prevExpanded.map((item:any, idx:any) => (idx === index ? !item : item))
    );
  };
  const handleTongleAll = () => {
    if (toggle) {
      setExpanded(Array(courses && courses.lesson.length).fill(true));
      setToggle(false);
    } else {
      setExpanded(Array(courses && courses.lesson.length).fill(false));
      setToggle(true);
    }
  };

  const handleProgress = async () => {
    try {
      let arr = courses.lesson.map((item: any, index: number) => {
        return {
          lesson_id: item._id,
          completed: false,
          sub_lesson: item.sub_lesson.map((item2: any, index2: number) => {
            if (index == 0 && index2 == 0) {
              return {
                sub_lesson_id: item2._id,
                completed: false,
                result: true,
              };
            }
            return {
              sub_lesson_id: item2._id,
              completed: false,
              result: false,
            };
          }),
        };
      });

      let body = {
        courses_id: courses._id,
        completed: false,
        user_id: "66402cb7c2437f1cb1ad9889",
        lesson_progress: arr,
      };
      // let data = await addProgress(body);
      navigate(`/learning/${courses && courses._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <DetailCourseView
        courses={courses && courses}
        expanded={expanded}
        handleTongle={handleTongle}
        handleTongleAll={handleTongleAll}
        toggle={toggle}
        totalLesson={totalLesson}
        navigate={navigate}
        handleProgress={handleProgress}
      />
    </>
  );
};

export default DetailCourseController;
