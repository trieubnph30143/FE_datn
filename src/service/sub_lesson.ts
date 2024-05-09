import axios from "../core/api";
export const getSubLesson = async () => {
  try {
    const response = await axios.get(`/sublesson`);
    return response.data;
  } catch (error) {
    console.log(`get_Lesson`, error);
  }
};
export const addSubLesson = async (value: any) => {
  try {
    const response = await axios.post(`/sublesson`, value);
    return response.data;
  } catch (error) {
    console.log(`add_Lesson`, error);
  }
};
export const updateSubLesson = async (value: any) => {
  try {
    const response = await axios.put(`/sublesson/${value._id}`, {
      lesson: {
        title: value.title,
        description: value.description,
        duration: value.duration,
        courses_id: value.courses_id,
        sub_lesson: value.sub_lesson,
      },
      changeCourses: value.changeCourses,
      coursesOld: value.coursesOld,
    });
    return response.data;
  } catch (error) {
    console.log(`update_Lesson`, error);
  }
};
export const deleteSubLesson = async (id?: string, idCourses?: string) => {
  try {
    const response = await axios.delete(`/sublesson/${id}`);
    return response.data;
  } catch (error) {
    console.log(`delete_Lesson`, error);
  }
};
