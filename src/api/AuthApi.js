import AxiosClient from "./AxiosClient";

export default class AuthApi {
  static async register({user}) {
    try {
      console.log(user);
      const response = await AxiosClient.post(`/auth/register`, user);
      // console.log(response);
      return response;
    } catch (error) {
      // console.log(error);
      throw new Error(error.message);
    }
  }
  static async login({user}) {
    try {
      const response = await AxiosClient.post(`/auth/login`, user);
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
