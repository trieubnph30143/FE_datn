import { useState } from "react";
import WiteBlogPostView from "./WiteBlogPostView";
import { usePostMutation } from "@/hooks/usePostMutation";

const WiteBlogPostController = () => {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const handleEditorChange = (e: any, editor: any) => {
    setContent(editor.getContent());
  };

  const handleImageChange = (e: any) => {
    let file = e.target.files[0];

    if (!file) return;
    setFile(file);
    const reader: any = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const { register, handleSubmit, onFinish, errors, reset } = usePostMutation({
    file,
    action: "CREATE",
    content,
    onSuccess: () => {
      reset();
      setTimeout(() => {
        setFile(null);
        setImageUrl("");
      }, 1000);
    },
  });
  return (
    <>
      <WiteBlogPostView
        content={content}
        imageUrl={imageUrl}
        handleEditorChange={handleEditorChange}
        handleImageChange={handleImageChange}
        register={register}
        handleSubmit={handleSubmit}
        onFinish={onFinish}
      />
    </>
  );
};

export default WiteBlogPostController;
