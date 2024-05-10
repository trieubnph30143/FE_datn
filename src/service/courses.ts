import axios from "../core/api";
export const getCourses = async () => {
  try {
    const response = await axios.get(`/courses`);
    return response.data;
  } catch (error) {
    console.log(`get_Courses`, error);
  }
};
export const addCourses = async (value: typeCourses) => {
  try {
    const response = await axios.post(`/courses`, value);
    return response.data;
  } catch (error) {
    console.log(`add_Courses`, error);
  }
};
export const updateCourses = async (value: typeCourses) => {
  try {
    const response = await axios.put(`/courses/${value._id}`, {
      title: value.title,
      description: value.description,
      price: value.price,
      image: value.image,
      instructor: value.instructor,
      category_id: value.category_id,
    });
    return response.data;
  } catch (error) {
    console.log(`update_Courses`, error);
  }
};
export const updateArrangeCourses = async (value: any) => {
  try {
    const response = await axios.put(`/courses/arrange/${value._id}`, value.lesson);
    return response;
  } catch (error) {
    console.log(`update_Lesson`, error);
  }
};
export const deleteCourses = async (id?: string) => {
  try {
    const response = await axios.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.log(`delete_Courses`, error);
  }
};
