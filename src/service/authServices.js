import AuthApi from "../api/AuthApi";
const createNewUser = async (req) => {
  try {
    const response = await AuthApi.createUser(req);
    // if (response.returnCode === 200) {
      console.log("Register success");
      return response;
    //}
  } catch (error) {
    console.log("Create error", error);
    // throw new Error(getMessage(parseInt(error.getMessage, 10)));
  }
};

const login = async (req) => {
  console.log("1");
  try {
    const response = await AuthApi.login(req);
      console.log("response", response);
      return response;
   
  } catch (error) {
    console.log("Login error", error);
  }
};
const authServices = {
  createNewUser,
  login,
};

export default authServices;
