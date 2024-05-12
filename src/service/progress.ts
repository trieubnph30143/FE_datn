import axios from "../core/api";
export const addProgress = async (value: any) => {
  try {
    const response = await axios.post(`/progress`, value);
    return response.data;
  } catch (error) {
    console.log(`add_progress`, error);
  }
};
export const getProgress = async (id: string) => {
  try {
    const response = await axios.get(`/progress/${id}`);
    return response.data;
  } catch (error) {
    console.log(`get_progress`, error);
  }
};
