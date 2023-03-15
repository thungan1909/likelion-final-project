import AxiosClient from "./AxiosClient";

export default class AuthApi {
  //async trả về 1 promise
  static async createUser(req) {
    try {
      const response = await AxiosClient.post("auth/register", req);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // static async createUser({user}) {
  //   try {
  //     const response = await AxiosClient.post("auth/register", user);
  //     return response;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }
  static async login(req) {
    try {
      const response = await AxiosClient.post("auth/login", req);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
