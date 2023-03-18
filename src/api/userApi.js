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
}