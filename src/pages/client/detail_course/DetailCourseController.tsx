import { useQuery } from "react-query";
import DetailCourseView from "./DetailCourseView";
import { getOneCourses } from "@/service/courses";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { addProgress, getProgress, getUserProgress } from "@/service/progress";
import { useCoursesContext } from "@/App";

const DetailCourseController = () => {
  const { id } = useParams();
  const [toggle, setToggle] = useState(true);
  const [totalLesson, setTotalLesson] = useState(0);
  const navigate = useNavigate();
  const [expanded, setExpanded]: any = useState([]);
  const context: any = useCoursesContext();
  const { data: courses } = useQuery("detail", {
    queryFn: () => {
      return getOneCourses(id && id);
    },
    onSuccess(data) {
      setExpanded([true, ...Array(data.lesson.length).fill(false)]);
      let total = 0;
      data.lesson.map((item: any) => (total += item.sub_lesson.length));
      setTotalLesson(total);
    },
  });

  const handleTongle = (index: number) => {
    setExpanded((prevExpanded: any) =>
      prevExpanded.map((item: any, idx: any) => (idx === index ? !item : item))
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
      
      if (Object.keys(context.state.user)[0]) {
      let body = {
        courses_id: courses._id,
        completed: false,
        user_id: context.state.user !== undefined&& context.state.user[0]._id,
        lesson_progress: arr,
      };
      
        let data = await addProgress(body);
        if (data?.status == 0) {
          let res:any = await getUserProgress(context.state.user[0]._id) 
          context.dispatch({
            type: "PROGRESS",
            payload: {
              ...context.state,
              progress: res.data,
            },
          });
          navigate(`/learning/${courses && courses._id}`);
        }
      } else {
        alert("ban can dang nhap");
      }
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
