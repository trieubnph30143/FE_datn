import { addLesson, deleteLesson, updateLesson } from "@/service/lesson";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
type useSubLessonMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
  defaultValues?: any;
  onSuccess?: () => void;
  type?: any;
  content?: any;
};

export const useSubLessonMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
  type,
  content,
}: useSubLessonMutationProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (sub_lesson: any) => {
      switch (action) {
        // case "CREATE":
        //   return await addsub_lesson({ ...sub_lesson });
        // case "UPDATE":
        //   return await updatesub_lesson(sub_lesson);
        // case "DELETE":
        //   return await deletesub_lesson(sub_lesson._id,sub_lesson.courses_id[0]._id);
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson"],
      });
      onSuccess && onSuccess();
    },
  });
  const onFinish = async (values: any) => {
    if (type == 0) {
      console.log({ ...values, type: "video" });
      // video
    } else if (type == 1) {
      let question = [
        {
          answerOne: values.answerOne,
          correctOne: values.correctOne,
        },
        {
          answerTwo: values.answerTwo,
          correctTwo: values.correctTwo,
        },
        {
          answerThree: values.answerThree,
          correctThree: values.correctThree,
        },
      ];
      console.log({
        description: values.description,
        duration: values.duration,
        title: values.title,
        type: "quiz",
        content_quizz: content,
        question: JSON.stringify(question),
      });
      // quizz
    } else if (type == 2) {
      // blog
      console.log({
        description: values.description,
        duration: values.duration,
        title: values.title,
        type: "blog",
        content_blog: content,
      });
    } else {
      console.log({
        description: values.description,
        duration: values.duration,
        title: values.title,
        type: "code",
        content_code: content,
        type_exercise:values.type_exercise,
        solution_key:values.solution_key
      });
      // code
    }
  };
  const onRemove = (sub_lesson: any) => {
    mutate(sub_lesson);
  };
  return {
    register,
    onFinish,
    onRemove,
    handleSubmit,
    errors,
    reset,
  };
};
