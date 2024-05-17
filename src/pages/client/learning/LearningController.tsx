import Loading from "@/components/Loading";
import { useLocalStorage } from "@/hooks/useStorage";
import { getOneCourses } from "@/service/courses";
import { getProgress, updateProgress } from "@/service/progress";
import { calculateProgress } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommentController from "./CommentController";
import LearningView from "./LearningView";
const LearningController = () => {
  const queryClient = useQueryClient();
  const { id }: any = useParams();
  const [toggle, setToggle] = useState(true);
  const [totalLesson, setTotalLesson] = useState(0);
  const [activeLesson, setActiveLesson] = useState(null);
  const [dataLesson, setDataLesson]: any = useState({});
  const [typeCode, setTypeCode]: any = useState(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [done, setDone] = useState(false);
  const playedRef = useRef(0);
  const [loading, setLoading]: any = useState(false);
  const [detail, setDetail]: any = useState({});
  const [expanded, setExpanded]: any = useState([]);
  const [progressBar, setprogressBar]: any = useState([]);
  const [totalProgressBar, setTotalprogressBar]: any = useState(0);
  const player: any = useRef(null);
  const [user, setUser] = useLocalStorage("user", {});

  const [loadingAll, setLoadingAll] = useState({
    courses: false,
    progress: false,
  });
  console.log(activeLesson);
  const navigate = useNavigate();

  const { data: progress } = useQuery(["progress", id], {
    queryFn: () => {
      return getProgress(user.data[0]._id, id);
    },
    onSuccess(data) {
      let total = 0;
      data[0].lesson_progress.map((item: any) => {
        item.sub_lesson.map(() => total++);
      });
      const percentagePerItem = Math.round(100 / total);
      setTotalprogressBar(percentagePerItem);
      let arr = calculateProgress(data);

      setprogressBar(arr);
      setLoadingAll({ ...loadingAll, progress: true });
    },
    refetchOnWindowFocus: false,
  });
  const { data: courses } = useQuery("detail", {
    queryFn: () => {
      return getOneCourses(id && id);
    },
    onSuccess(data) {
      setTimeout(() => {
        setLoadingAll({ ...loadingAll, courses: true });
      }, 500);

      let arr = [...Array(data.lesson.length).fill(false)];
      setDetail(data);
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
              arr[index] = true;
              setExpanded(arr);
              setActiveLesson(itemChild._id);
              setDataLesson(itemChild);
              if (itemChild.type == "blog") {
                setDone(true);
              }
              if (itemChild.type == "code") {
                if (
                  Object.keys(JSON.parse(itemChild.type_exercise)).length == 2
                ) {
                  setTypeCode("html-css");
                } else {
                  for (let key in JSON.parse(itemChild.type_exercise)) {
                    if (key == "html") {
                      setTypeCode("html");
                    } else {
                      setTypeCode("javascript");
                    }
                  }
                }
              }
            }
            if (progress[0].completed) {
              arr[0] = true;
              setExpanded(arr);
              setActiveLesson(
                progress[0].lesson_progress[0].sub_lesson[0].sub_lesson_id
              );
              setDataLesson(data.lesson[0].sub_lesson[0]);
              if (data.lesson[0].sub_lesson[0].type == "blog") {
                setDone(true);
              }
              if (data.lesson[0].sub_lesson[0].type == "code") {
                if (
                  Object.keys(
                    JSON.parse(data.lesson[0].sub_lesson[0].type_exercise)
                  ).length == 2
                ) {
                  setTypeCode("html-css");
                } else {
                  for (let key in JSON.parse(
                    data.lesson[0].sub_lesson[0].type_exercise
                  )) {
                    if (key == "html") {
                      setTypeCode("html");
                    } else {
                      setTypeCode("javascript");
                    }
                  }
                }
              }
            }
          }
        });

        return (total += item.sub_lesson.length);
      });

      setTotalLesson(total);
    },

    refetchOnWindowFocus: false,
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


  // xu ly video
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        "videoCurrentTime",
        JSON.stringify(playedRef.current)
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [playedRef.current]);

  useEffect(() => {
    const savedTime: any = localStorage.getItem("videoCurrentTime");

    if (player.current) {
      player.current.seekTo(JSON.parse(savedTime));
    }
  }, [player.current]);

  const handleProgress = (state: any) => {
    if (playedRef.current !== state.played) {
      playedRef.current = state.played;
    }
  };
  const handleEnded = () => {
    setDone(true);
    setPlaying(false);
  };

  console.log(activeLesson);
  console.log(dataLesson);
  const handleNextLesson = async () => {
    setLoading(true);
    try {
      if (progress[0].completed) {
        progress[0].lesson_progress.map((item: any, index: number) => {
          item.sub_lesson.map((itemChild: any, index2: number) => {
            if (activeLesson == itemChild.sub_lesson_id) {
              let length =
                progress[0].lesson_progress[index].sub_lesson.length - 1;
              let lengthLesson = progress[0].lesson_progress.length - 1;
              if (lengthLesson == index && length == index2) {
                true;
                toast.success("Chúc mừng bạn đã hoàn thành khóa học");
              } else {
                if (length == index2) {
                  expanded[index + 1] = true;
                  setExpanded(expanded);
                  setActiveLesson(
                    progress[0].lesson_progress[index + 1].sub_lesson[0]
                      .sub_lesson_id
                  );
                  setDataLesson(courses.lesson[index + 1].sub_lesson[0]);
                } else {
                  setActiveLesson(
                    progress[0].lesson_progress[index].sub_lesson[index2 + 1]
                      .sub_lesson_id
                  );
                  setDataLesson(courses.lesson[index].sub_lesson[index2 + 1]);

                  if (
                    courses.lesson[index].sub_lesson[index2 + 1].type == "code"
                  ) {
                    if (
                      Object.keys(
                        JSON.parse(
                          courses.lesson[index].sub_lesson[index2 + 1]
                            .type_exercise
                        )
                      ).length == 2
                    ) {
                      setTypeCode("html-css");
                    } else {
                      for (let key in JSON.parse(
                        courses.lesson[index].sub_lesson[index2 + 1]
                          .type_exercise
                      )) {
                        if (key == "html") {
                          setTypeCode("html");
                        } else {
                          setTypeCode("javascript");
                        }
                      }
                    }
                  }
                }
              }
            }
          });
        });
        setLoading(false);
      } else {
        if (done) {
          let arr = progress;
          progress[0].lesson_progress.map((item: any, index: number) => {
            item.sub_lesson.map((itemChild: any, index2: number) => {
              if (activeLesson == itemChild.sub_lesson_id) {
                let length =
                  progress[0].lesson_progress[index].sub_lesson.length - 1;
                let lengthLesson = progress[0].lesson_progress.length - 1;
                if (lengthLesson == index && length == index2) {
                  arr[0].lesson_progress[index].sub_lesson[index2].completed =
                    true;
                  arr[0].lesson_progress[index].completed = true;
                  arr[0].completed = true;
                  alert("chuc mung ban da hoan thanh khoa hoc");
                } else {
                  if (length == index2) {
                    expanded[index + 1] = true;
                    setExpanded(expanded);
                    arr[0].lesson_progress[index].completed = true;
                    arr[0].lesson_progress[index].sub_lesson[index2].completed =
                      true;
                    arr[0].lesson_progress[index + 1].sub_lesson[0].result =
                      true;
                    setActiveLesson(
                      arr[0].lesson_progress[index + 1].sub_lesson[0]
                        .sub_lesson_id
                    );
                    setDataLesson(courses.lesson[index + 1].sub_lesson[0]);
                  } else {
                    setActiveLesson(
                      arr[0].lesson_progress[index].sub_lesson[index2 + 1]
                        .sub_lesson_id
                    );
                    setDataLesson(courses.lesson[index].sub_lesson[index2 + 1]);
                    arr[0].lesson_progress[index].sub_lesson[
                      index2 + 1
                    ].result = true;
                    arr[0].lesson_progress[index].sub_lesson[index2].completed =
                      true;
                    if (
                      courses.lesson[index].sub_lesson[index2 + 1].type ==
                      "code"
                    ) {
                      if (
                        Object.keys(
                          JSON.parse(
                            courses.lesson[index].sub_lesson[index2 + 1]
                              .type_exercise
                          )
                        ).length == 2
                      ) {
                        setTypeCode("html-css");
                      } else {
                        for (let key in JSON.parse(
                          courses.lesson[index].sub_lesson[index2 + 1]
                            .type_exercise
                        )) {
                          if (key == "html") {
                            setTypeCode("html");
                          } else {
                            setTypeCode("javascript");
                          }
                        }
                      }
                    }
                  }
                }
              }
            });
          });
          if (dataLesson.type == "video" && done) {
            try {
              let data = await updateProgress(arr[0]);
              if (data?.status == 0) {
                setprogressBar([(progressBar[0] += totalProgressBar)]);
                queryClient.invalidateQueries({
                  queryKey: ["progress", "detail"],
                });
              }
            } catch (error) {}

            setLoading(false);
          }
          if (dataLesson.type == "blog") {
            try {
              let data = await updateProgress(arr[0]);
              if (data?.status == 0) {
                setprogressBar([(progressBar[0] += totalProgressBar)]);
                queryClient.invalidateQueries({
                  queryKey: ["progress", "detail"],
                });
                setLoading(false);
              }
            } catch (error) {}
          }
          if (dataLesson.type == "code") {
            let data = await updateProgress(arr[0]);
            setprogressBar([(progressBar[0] += totalProgressBar)]);
            queryClient.invalidateQueries({
              queryKey: ["progress", "detail"],
            });
            setLoading(false);
          }
          if (dataLesson.type == "quiz") {
            try {
              let data = await updateProgress(arr[0]);
              if (data?.status == 0) {
                setprogressBar([(progressBar[0] += totalProgressBar)]);
                queryClient.invalidateQueries({
                  queryKey: ["progress", "detail"],
                });

                setLoading(false);
              }
            } catch (error) {}
          }
        } else {
          toast.success("Bạn chưa hoàn thành bài học");
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      {!loadingAll.courses && <Loading />}

      {loadingAll.courses && loadingAll.progress && (
        <>
        <LearningView
          courses={courses && courses}
          expanded={expanded}
          handleTongle={handleTongle}
          handleTongleAll={handleTongleAll}
          toggle={toggle}
          activeLesson={activeLesson}
          handleActiveLesson={handleActiveLesson}
          dataLesson={dataLesson}
          typeCode={typeCode}
          progress={progress}
          handleProgress={handleProgress}
          handleEnded={handleEnded}
          player={player}
          playing={playing}
          played={playedRef.current}
          handleNextLesson={handleNextLesson}
          done={done}
          loading={loading}
          setDone={setDone}
          progressBar={progressBar}
          totalProgressBar={totalProgressBar}
         
        />
        <CommentController
        lesson_id={activeLesson}
        courses_id={id}
        />
        
        </>
      )}

    </>
  );
};

export default LearningController;
