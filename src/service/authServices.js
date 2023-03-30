import AuthenApi from "../api/authenApi";

const createNewUser = async (req) => {
  try {
    const response = await AuthenApi.createUser(req);
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
  try {
    const response = await AuthenApi.login(req);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("Login error", error);
  }
};
const authServices = {
  createNewUser,
  login,
};

export default authServices;
