import AxiosClient from "./axiosServerClient";

export default class UserApi {
  static async getUserById(userId) {
    try {
      const response = await AxiosClient.get(`user/${userId}`);
      return response;
    } catch (error) {
      throw error.response;
    }
  }
  static async getAllUsersAPI() {
    try {
      const response = await AxiosClient.get(`user`);

      return response;
    } catch (error) {
      throw error.response;
    }
  }
  static async deleteUserById(userId) {
    try {
      const response = await AxiosClient.delete(`user/${userId}/delete`);
      return response;
    } catch (error) {
      throw error.response;
    }
  }
  static async updateUser(userId, userInfo) {
    try {
      const response = await AxiosClient.put(`user/${userId}/update`, userInfo);
      return response;
    } catch (error) {
      throw error.response;
    }
  }

  static async getUsersPerWeekInMonthAPI() {
    try {
      const response = await AxiosClient.get(
        `user/new-users-per-week-in-month`
      );
      return response;
    } catch (error) {
      throw error.response;
    }
  }
  static async getUsersInMonthAPI() {
    try {
      const response = await AxiosClient.get(`user/new-users-month`);
      return response;
    } catch (error) {
      throw error.response;
    }
  }
}
