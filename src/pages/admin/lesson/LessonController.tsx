import React, { useState } from "react";
import LessonView from "./LessonView";
import { useQuery } from "react-query";
import { getCourses } from "@/service/courses";
import { useLessonMutation } from "@/hooks/useLessonMutation";
import { getLesson } from "@/service/lesson";

const LessonController = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [deleteLesson, setDeleteLesson] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [coursesOld, setCoursesOld] = React.useState(null);
  const [valueCourses, setValueCourses] = useState("");
  const handleCloseModal = () => setOpenModal(false);
  const [action, setAction]: any = useState("CREATE");
 
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    dataDelete: any
  ) => {
    setDeleteLesson(dataDelete);
    setAnchorEl(event.currentTarget);
  };

  const { data } = useQuery("lesson", {
    queryFn: () => getLesson(),
  });

  const { data: courses } = useQuery("courses", {
    queryFn: () => getCourses(),
  });
  const { register, handleSubmit, onFinish, errors, reset } =
    useLessonMutation({
      action: action,
      coursesOld,
      onSuccess: () => {
        reset();
        setTimeout(() => {
          handleCloseModal();
          setLoading(false);
        }, 1000);
      },
    });
  const handleClose = () => {
    setDeleteLesson(null);
    setAnchorEl(null);
  };

  const handleOpenModal = (type: any, data: any) => {
    setAction(type)
    if (type == "CREATE") {
      setValueCourses("");
      reset({
        title: "",
        duration: 0,
        description: "",
        
      });
      setOpenModal(true);
    } else {
      setCoursesOld(data.courses_id[0]._id)
      setValueCourses(data.courses_id[0]._id);
      reset({ ...data, courses_id: data.courses_id[0]._id });
      setOpenModal(true);
    }
  };
  const { onRemove } = useLessonMutation({
    action: "DELETE",
    onSuccess: () => {
      handleClose();
      setLoading(false);
    },
  });
  const onSubmit = () => {
    // setLoading(true);
  };
  const handleDelete = async (value: any) => {
    setLoading(true);
        onRemove(value);
  
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <LessonView 
      register={register}
      handleSubmit={handleSubmit}
      onFinish={onFinish}
      errors={errors}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      openModal={openModal}
      data={data}
      onSubmit={onSubmit}
      handleDelete={handleDelete}
      handleClick={handleClick}
      handleClose={handleClose}
      id={id}
      anchorEl={anchorEl}
      open={open}
      action={action}
      courses={courses}
      deleteLesson={deleteLesson}
      valueCourses={valueCourses}
      setValueCourses={setValueCourses}
      />
    </>
  );
};

export default LessonController;
