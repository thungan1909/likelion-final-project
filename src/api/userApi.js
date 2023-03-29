import AxiosClient from "./axiosClient";

export default class UserApi {
    static async getUserById (userId){
        try{
            const response = await AxiosClient.get(`user/${userId}`);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async getAllUsersAPI () {
     
        try {
            const response = await AxiosClient.get(`user`);
            console.log(response);
            return response;
        }
        catch (error) {
            throw new Error (error.message);
        }
    }
    static async deleteUserById(userId) {
        try {
            const response = await AxiosClient.delete(`user/${userId}/delete`);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async updateUser(userId, userInfo) {
        try {
            const response = await AxiosClient.put(`user/${userId}/update`, userInfo);
            console.log(response);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    static async getUsersPerWeekInMonthAPI () {
        try {
            const response = await AxiosClient.get(`user/new-users-per-week-in-month`);
            // console.log(response);
            return response;
        }
        catch (error) {
            throw new Error (error.message);
        }
    }
    static async getUsersInMonthAPI () {
        try {
            const response = await AxiosClient.get(`user/new-users-month`);
            // console.log(response);
            return response;
        }
        catch (error) {
            throw new Error (error.message);
        }
    }
}
