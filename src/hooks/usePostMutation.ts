import { addPost, deletePost, updateActivePost } from "@/service/post";
import { deleteImage, uploadImage } from "@/service/upload";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
type usePostMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE"|"ACTIVE";
  defaultValues?: any;
  onSuccess?: () => void;
  file?: any;
  content?:any
};
const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  readers: yup.string().required(),
});
export const usePostMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
  file,
  content
}: usePostMutationProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate, ...rest } = useMutation({
    mutationFn: async (post: any) => {
      switch (action) {
        case "CREATE":
          return await addPost({ ...post });
        case "ACTIVE":
          return await updateActivePost(post);
        case "DELETE":
          return await deletePost(post._id);
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      onSuccess && onSuccess();
    },
  });
  const onFinish = async (values: any) => {
    if (action === "CREATE") {
      const formData = new FormData();
      formData.append("image", file);
      const upload: any = await uploadImage(formData);
      if (Object.keys(upload).length > 0) {
        mutate({
          ...values,
          content:content,
          image: {
            url: upload.imageUrl.secure_url,
            public_id: upload.imageUrl.public_id,
          },
          author:["6641ccf4ced6dff448e6fcbf"],
          active:false
        });
      }
    } else {
      if (file === null) {
        mutate({
          ...values,
        });
      } else {
        let image: any = await deleteImage(values.image.public_id);
        if (image.imageUrl.result == "ok") {
          const formData = new FormData();
          formData.append("image", file);
          const upload: any = await uploadImage(formData);
          if (Object.keys(upload).length > 0) {
            mutate({
              ...values,
            
              image: {
                url: upload.imageUrl.secure_url,
                public_id: upload.imageUrl.public_id,
              },
            });
          }
        }
      }
    }
  };
  const onRemove = (post: any) => {
    mutate(post);
  };
  const onActive= (post: any) => {
    mutate(post);
  };
  return {
    register,
    onFinish,
    onRemove,
    handleSubmit,
    errors,
    reset,
    onActive
  };
};
