import axios from "../core/api";
export const getPost = async () => {
  try {
    const response = await axios.get(`/post`);
    return response.data;
  } catch (error) {
    console.log(`get_Post`, error);
  }
};
export const getOnePost = async (id:string) => {
  try {
    const response = await axios.get(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.log(`get_Post`, error);
  }
};
export const getUserPost = async (id:string) => {
  try {
    const response = await axios.get(`/post/user/${id}`);
    return response;
  } catch (error) {
    console.log(`get_Post`, error);
  }
};
export const getPostActive = async (data:any) => {
  try {
    const response = await axios.get(`/post/active?page=${data.page}&size=${data.limit}`);
    return response;
  } catch (error) {
    console.log(`get_Post`, error);
  }
};
export const addPost = async (value: any) => {
  try {
    const response = await axios.post(`/post`, value);
    return response.data;
  } catch (error) {
    console.log(`add_Post`, error);
  }
};
export const updatePost = async (value: any) => {
  try {
    const response = await axios.put(`/post/${value._id}`, {
      title: value.title,
      content: value.content,
      image:value.image,
      readers:value.readers,
      description:value.description,
      active:value.active,
      author:value.author
    });
    return response.data;
  } catch (error) {
    console.log(`update_Post`, error);
  }
};
export const updateActivePost = async (value: any) => {
  try {
    const response = await axios.put(`/post/active/${value._id}`, {
    });
    return response.data;
  } catch (error) {
    console.log(`update_Post`, error);
  }
};
export const deletePost = async (id?: string) => {
  try {
    const response = await axios.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.log(`delete_Post`, error);
  }
};
