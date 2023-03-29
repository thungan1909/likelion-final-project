import AxiosClient from "./axiosClient";

export default class IdeaApi{
    static async addIdea(req){
        try {
            const response = await AxiosClient.post(`idea/add`, req);
            console.log(response);
            return response;
        }
        catch (error) {
            throw new Error (error.message);
        }
    }
    static async getAllIdea() {
        try{
            const response = await AxiosClient.get(`idea`);
            console.log(response);
            return response;
        }
        catch (error) {
            throw new Error (error.message);
        }
    }
    static async getIdeasPerWeekInMonthAPI () {
        try {
            const response = await AxiosClient.get(`idea/new-ideas-per-week-in-month`);
            // console.log(response);
            return response;
        }
        catch (error) {
            throw new Error (error.message);
        }
    }
}