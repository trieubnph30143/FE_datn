import {
  addCategories,
  deleteCategories,
  updateCategories,
} from "@/service/categories";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Signin, Signup } from "@/service/auth";
import { useLocalStorage } from "./useStorage";
type useAuthMutationProps = {
  action: "SIGNIN" | "SIGNUP" ;
  defaultValues?: any;
  onSuccess?: (data:any) => void;
};
const schemaSignup = yup.object({
  user_name: yup.string().required(),
  email: yup.string().required(),
});
const schemaSignin:any = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});
export const useAuthMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
}: useAuthMutationProps) => {
  const queryClient = useQueryClient();
  const [, setUser] = useLocalStorage("user", {});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(action=="SIGNIN"?schemaSignin:schemaSignup),
  });
  const { mutate, ...rest } = useMutation({
    mutationFn: async (auth: typeAuth) => {
      switch (action) {
        case "SIGNIN":
          return await Signin({ ...auth });
        case "SIGNUP":
          return await Signup(auth);
        
        default:
          return null;
      }
    },
    onSuccess: (data) => {
      if(action=="SIGNIN"){
        if (Object.keys(data)[0]) {
          setUser(data);
        }
      }
      onSuccess && onSuccess(data);
    },
  });
  const onFinish = async (values: typeAuth) => {
      
    console.log(values);
    mutate(values);
  };
  // const onRemove = (categories: typeAuth) => {
  //   mutate(categories);
  // };
  return {
    register,
    onFinish,
    // onRemove,
    handleSubmit,
    errors,
    reset,
  };
};
