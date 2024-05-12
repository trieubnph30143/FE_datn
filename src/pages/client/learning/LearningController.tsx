import { useNavigate, useParams } from "react-router-dom";
import LearningView from "./LearningView";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getOneCourses } from "@/service/courses";
import { getProgress } from "@/service/progress";

const LearningController = () => {
  const { id } = useParams();
  const [toggle, setToggle] = useState(true);
  const [totalLesson, setTotalLesson] = useState(0);
  const [activeLesson, setActiveLesson] = useState(null);
  const [dataLesson, setDataLesson] = useState({});
  const [typeCode, setTypeCode]: any = useState(null);
  const playerRef: any = useRef(null);
   const [open, setOpen] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const handleVideoEnd = () => {
    console.log("Đã xem hết video!");
  };
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("videoCurrentTime", JSON.stringify(currentTime));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentTime]);

  const navigate = useNavigate();
  const { data: progress } = useQuery("progress", {
    queryFn: () => {
      return getProgress("66402cb7c2437f1cb1ad9889");
    },
  });
  const { data: courses } = useQuery("detail", {
    queryFn: () => {
      return getOneCourses(id && id);
    },
    onSuccess(data) {
      let total = 0;
      data.lesson.map((item: any, index: number) => {
        item.sub_lesson.map((itemChild: any, index2: number) => {
          if (progress) {
            if (
              progress[0].lesson_progress[index].sub_lesson[index2].result &&
              progress[0] &&
              progress[0].lesson_progress[index].sub_lesson[index2].completed ==
                false
            ) {
              setActiveLesson(itemChild._id);
              setDataLesson(itemChild);
            }
          }
        });

        return (total += item.sub_lesson.length);
      });
      setTotalLesson(total);
    },
  });

  const [expanded, setExpanded] = useState([
    true,
    ...Array(courses && courses.lesson.length).fill(false),
  ]);

  const handleTongle = (index: number) => {
    console.log(index);
    setExpanded((prevExpanded) =>
      prevExpanded.map((item, idx) => (idx === index ? !item : item))
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
  const handleActiveLesson = (data: any) => {
    setActiveLesson(data._id);
    setDataLesson(data);
    if (data.type == "code") {
      if (Object.keys(JSON.parse(data.type_exercise)).length == 2) {
        setTypeCode("html-css");
      } else {
        for (let key in JSON.parse(data.type_exercise)) {
          if (key == "html") {
            setTypeCode("html");
          } else {
            setTypeCode("javascript");
          }
        }
      }
    }
  };
   

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };
  return (
    <>
      <LearningView
        courses={courses && courses}
        expanded={expanded}
        handleTongle={handleTongle}
        handleTongleAll={handleTongleAll}
        toggle={toggle}
        totalLesson={totalLesson}
        navigate={navigate}
        activeLesson={activeLesson}
        handleActiveLesson={handleActiveLesson}
        dataLesson={dataLesson}
        typeCode={typeCode}
        progress={progress}
        handleVideoEnd={handleVideoEnd}
        setCurrentTime={setCurrentTime}
        playerRef={playerRef}
        toggleDrawer={toggleDrawer}
        open={open}
      />
    </>
  );
};

export default LearningController;
