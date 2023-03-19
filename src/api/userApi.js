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
    static async getAllUser () {
        try {
            const response = await AxiosClient.get(`user`);
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
}