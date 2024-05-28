import axios from "../core/api";
export const getOneTransaction = async (id:any) => {
  try {
    const response = await axios.get(`/transaction/${id}`);
    return response;
  } catch (error) {
    console.log(`get_Categories`, error);
  }
};
export const getUserTransaction = async (id:any) => {
  try {
    const response = await axios.get(`/transaction/user/${id}`);
    return response;
  } catch (error) {
    console.log(`get_Categories`, error);
  }
};
export const addTransactions = async (value: any) => {
  try {
    const response = await axios.post(`/transaction`, value);
    return response;
  } catch (error) {
    console.log(`add_Categories`, error);
  }
};
export const updateTransaction = async (value: any) => {
  try {
    const response = await axios.put(`/transaction/status/${value._id}`,{status:value.status});
    return response;
  } catch (error) {
    console.log(`update_Categories`, error);
  }
};

