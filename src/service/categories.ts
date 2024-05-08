import axios from "../core/api";
export const getCategories = async () => {
  try {
    const response = await axios.get(`/categories`);
    return response.data;
  } catch (error) {
    console.log(`get_Categories`, error);
  }
};
export const addCategories = async (value: typeCategories) => {
  try {
    const response = await axios.post(`/categories`, value);
    return response.data;
  } catch (error) {
    console.log(`add_Categories`, error);
  }
};
export const updateCategories = async (value: typeCategories) => {
  try {
    const response = await axios.put(`/categories/${value._id}`, {
      name: value.name,
      description: value.description,
    });
    return response.data;
  } catch (error) {
    console.log(`update_Categories`, error);
  }
};
export const deleteCategories = async (id?: string) => {
  try {
    const response = await axios.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.log(`delete_Categories`, error);
  }
};
