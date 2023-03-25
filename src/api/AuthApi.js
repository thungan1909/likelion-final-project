import AxiosClient from "./axiosClient";

export default class AuthApi {

  //async function to handle asynchronous tasks
  //async return a promise

  static async createUser(req) {
    
    try {
      const response = await AxiosClient.post("auth/register", req);
    
      return response;
      
    } catch (error) {
      
      throw new Error(error.message);
    }
  }
  static async login(req) {
    try {
      const response = await AxiosClient.post("auth/login", req);
      // console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.message);
     
    }
  }
  static async logout (req) {
    try {
      console.log(req);
      const response = await AxiosClient.post("auth/logout");
      return response;
    }
    catch (error) {
      throw new Error (error.message);
    }
  }
}
