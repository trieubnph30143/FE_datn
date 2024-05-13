import axios from "../core/api";
export const getPost = async () => {
  try {
    const response = await axios.get(`/post`);
    return response.data;
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
      name: value.name,
      description: value.description,
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
