import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLessonMutation } from "@/hooks/useLessonMutation";
import { getLesson } from "@/service/lesson";
import SubLessonView from "./SubLessonView";
import { useSubLessonMutation } from "@/hooks/useSubLessonMutation";

const SubLessonController = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [deleteLesson, setDeleteLesson] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [valueCourses, setValueCourses] = useState("");
  const handleCloseModal = () => setOpenModal(false);
  const [action, setAction]: any = useState("CREATE");
  const [value, setValue] = React.useState(0);
  const [content, setContent] = React.useState("");
  const [valueRight, setValueRight] = React.useState(0);
  const [exerciseHtml, setexerciseHtml] = React.useState("");
  const [exerciseCss, setexerciseCss] = React.useState("");
  const [exercise, setExercise]: any = useState();
  const handleEditorChange = (e: any, editor: any) => {
    setContent(editor.getContent());
  };
  console.log(valueRight);
  const handleChangeRight = (event: React.SyntheticEvent, newValue: number) => {
    setValueRight(newValue);
  };

  const handleChangeExercise = (e: any) => {
    setExercise(e);
  };
  const handleChangeExerciseHtml = (e: any) => {
    setexerciseHtml(e);
  };
  const handleChangeExerciseCss = (e: any) => {
    setexerciseCss(e);
  };
  const handleChangeType = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    dataDelete: any
  ) => {
    setDeleteLesson(dataDelete);
    setAnchorEl(event.currentTarget);
  };

  const { data:lesson } = useQuery("lesson", {
    queryFn: () => getLesson(),
  });

  
  const { register, handleSubmit, onFinish, errors, reset } =
    useSubLessonMutation({
      action: action,
      type:value,
      content,
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
    setOpenModal(true);
    // if (type == "CREATE") {
    //   setValueCourses("");
    //   reset({
    //     title: "",
    //     duration: 0,
    //     description: "",
        
    //   });
      
    // } else {
    //   setCoursesOld(data.courses_id[0]._id)
    //   setValueCourses(data.courses_id[0]._id);
    //   reset({ ...data, courses_id: data.courses_id[0]._id });
    //   setOpenModal(true);
    // }
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
      <SubLessonView 
      register={register}
      handleSubmit={handleSubmit}
      onFinish={onFinish}
      errors={errors}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      openModal={openModal}
      data={[]}
      lesson={lesson}
      onSubmit={onSubmit}
      handleDelete={handleDelete}
      handleClick={handleClick}
      handleClose={handleClose}
      id={id}
      anchorEl={anchorEl}
      open={open}
      action={action}
      deleteLesson={deleteLesson}
      valueCourses={valueCourses}
      setValueCourses={setValueCourses}
      handleEditorChange={handleEditorChange}
      value={value}
      handleChangeType={handleChangeType}

      handleChangeRight={handleChangeRight}
      handleChangeExercise={handleChangeExercise}
      handleChangeExerciseHtml={handleChangeExerciseHtml}
      handleChangeExerciseCss={handleChangeExerciseCss}
      valueRight={valueRight}
      
      />
    </>
  );
};

export default SubLessonController;
