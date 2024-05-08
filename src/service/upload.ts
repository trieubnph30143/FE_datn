import axios from "../core/api";
export const uploadImage = async (data: any) => {
  try {
    const response = await axios.post(`/upload`, data);
    return response;
  } catch (error) {
    console.log(`upload`, error);
  }
};

export const deleteImage = async (id?: string) => {
  try {
    const response = await axios.delete(`/upload/${id}`);
    return response;
  } catch (error) {
    console.log(`delete_upload`, error);
  }
};
