import UserApi from "../api/userApi";

   const userId = localStorage.getItem("userId");
   let user;
    const getCurrentUser = async () => {
        try {
          const response = await UserApi.getUserById(userId);
          user = response;
        } catch (error) {}
        return user;
      };

const GetCurrentUserService = {
   getCurrentUser,
  };
export default GetCurrentUserService;