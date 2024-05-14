import axios from "../core/api";
export const Signup = async (email: typeAuth) => {
    try {
        delete email.password
      const response = await axios.post(`/auth/signup`, email);
      return response;
    } catch (error) {
      console.log(`signup`, error);
    }
  };
  
  export const Signin = async (email: typeAuth) => {
    try {
      const response: any = await axios.post(`/auth/signin`, {
        email: email.email,
        password: email.password,
      });
      if (response.status === 1) {
        alert(response.message);
        return {};
      }
      return response;
    } catch (error) {
      console.log(`signup`, error);
    }
  };
  export const Authentication = async (token: string) => {
    try {
      const response = await axios.get(`/auth/authentication`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(`signup`, error);
    }
  };
  
  export const RefeshToken = async (token: string) => {
    try {
      const response = await axios.get(`/auth/refeshtoken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(`signup`, error);
    }
  };