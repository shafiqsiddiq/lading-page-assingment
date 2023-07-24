/* eslint-disable */

import api from "../../../utils/api";

// const login = async (req) => {
//   const { data } = await api.post(`/account/login`, req);
//   if (data?.succeeded) {
//     localStorage.setItem("user", JSON.stringify(data?.data));
//   } else {
//     throw data.message;
//   }
//   return data.data;
// };

// Static User Login
const login = async (userData) => {
  console.log("service",userData)
  if (
    userData?.email === "admin@uml.com" && userData?.password ==="12345678"
  ) {
    localStorage.setItem(
      "uml_user",
      JSON.stringify({
        email: userData.email,
      })
    );
  } else {
    throw new Error("Invalid Email or Password!");
  }
  return {
    email: userData.email,
  };
};

const register = async (req) => {
  const { data } = await api.post(`/account/register`, req);
  if (data?.succeeded) {
    return data.data;
  } else throw data.message;
};

// Logout user
const logout = () => {
  localStorage.removeItem("uml_user");
};

const authService = {
  logout,
  login,
  register,
};

export default authService;
