import AxiosClient from "./axiosServerClient";

export default class IdeaApi{
    static async addIdea(req){
        try {
            const response = await AxiosClient.post(`idea/add`, req);
            return response;
        }
        catch (error) {
            throw new Error (error.message);
        }
    }
    static async getAllIdea() {
        try{
            const response = await AxiosClient.get(`idea`);
            return response;
        }
        catch (error) {
            throw new Error (error.message);
        }
    }
    static async getIdeasInMonthAPI () {
        try {
            const response = await AxiosClient.get(`idea/new-ideas-month`);
            return response;
        }
        catch (error) {
            throw new Error (error.message);
        }
    }
    static async getIdeasPerWeekInMonthAPI () {
        try {
            const response = await AxiosClient.get(`idea/new-ideas-per-week-in-month`);
            return response;
        }
        catch (error) {
            throw new Error (error.message);
        }
    }
}