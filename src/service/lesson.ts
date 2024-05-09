import axios from "../core/api";
export const getLesson = async () => {
  try {
    const response = await axios.get(`/lesson`);
    return response.data;
  } catch (error) {
    console.log(`get_Lesson`, error);
  }
};
export const addLesson = async (value: typeLesson) => {
  try {
    const response = await axios.post(`/lesson`, value);
    return response.data;
  } catch (error) {
    console.log(`add_Lesson`, error);
  }
};
export const updateLesson = async (value: typeLesson) => {
  try {
    const response = await axios.put(`/lesson/${value._id}`, {
      title: value.title,
      description: value.description,
      duration: value.duration,
      courses_id: value.courses_id,
      sub_lesson: value.sub_lesson,
    });
    return response.data;
  } catch (error) {
    console.log(`update_Lesson`, error);
  }
};
export const deleteLesson = async (id?: string) => {
  try {
    const response = await axios.delete(`/lesson/${id}`);
    return response.data;
  } catch (error) {
    console.log(`delete_Lesson`, error);
  }
};
