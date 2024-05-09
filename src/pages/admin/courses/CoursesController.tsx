import React, { useState } from "react";
import CoursesView from "./CoursesView";
import { useCoursesMutation } from "@/hooks/useCoursesMutation";
import { useQuery } from "react-query";
import { getCourses } from "@/service/courses";
import Loading from "@/components/Loading";
import { getCategories } from "@/service/categories";
import { deleteImage } from "@/service/upload";
import { deleteCourses } from "../../../service/courses";

const CoursesController = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [deleteCourses, setDeleteCourses] = useState(null);
  const [file, setFile] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [valueCategory, setValueCategory] = useState("");
  const handleCloseModal = () => setOpenModal(false);
  const [action, setAction]: any = useState("CREATE");
  const [imageUrl, setImageUrl] = React.useState("");
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    dataDelete: any
  ) => {
    setDeleteCourses(dataDelete);
    setAnchorEl(event.currentTarget);
  };

  const { data } = useQuery("courses", {
    queryFn: () => getCourses(),
  });

  const { data: category } = useQuery("categories", {
    queryFn: () => getCategories(),
  });
  const { register, handleSubmit, onFinish, errors, reset } =
    useCoursesMutation({
      file,
      action: action,
      onSuccess: () => {
        reset();
        setTimeout(() => {
          handleCloseModal();
          setLoading(false);
          setFile(null);
          setImageUrl("");
        }, 1000);
      },
    });
  const handleClose = () => {
    setDeleteCourses(null);
    setAnchorEl(null);
  };

  const handleOpenModal = (type: any, data: any) => {
    setAction(type);
    if (type == "CREATE") {
      setValueCategory("");
      reset({
        title: "",
        instructor: "",
        price: 0,
        description: "",
        category_id: "",
      });
      setImageUrl("");
      setOpenModal(true);
    } else {
      setImageUrl(data.image.url);
      setValueCategory(data.category_id[0]._id);

      reset({ ...data, category_id: data.category_id[0]._id });
      setOpenModal(true);
    }
  };
  const { onRemove } = useCoursesMutation({
    action: "DELETE",
    onSuccess: () => {
      handleClose();
      setLoading(false);
    },
  });
  const onSubmit = () => {
    setLoading(true);
  };
  const handleDelete = async (value: any) => {
    setLoading(true);
    try {
      let image: any = await deleteImage(value.image.public_id);
      if (image.imageUrl.result == "ok") {
        onRemove(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <CoursesView
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
        setFile={setFile}
        category={category}
        deleteCourses={deleteCourses}
        valueCategory={valueCategory}
        setImageUrl={setImageUrl}
        imageUrl={imageUrl}
        setValueCategory={setValueCategory}
      />
      {loading && <Loading />}
    </>
  );
};

export default CoursesController;
