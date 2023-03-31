import AxiosClient from "./axiosServerClient";

export default class IdeaApi {
  static async addIdea(req) {
    try {
      const response = await AxiosClient.post(`idea/add`, req);
      return response;
    } catch (error) {
      throw error.response;
    }
  }
  static async getAllIdea() {
    try {
      const response = await AxiosClient.get(`idea`);
      return response;
    } catch (error) {
      throw error.response;
    }
  }
  static async getIdeasInMonthAPI() {
    try {
      const response = await AxiosClient.get(`idea/new-ideas-month`);
      return response;
    } catch (error) {
      throw error.response;
    }
  }
  static async getIdeasPerWeekInMonthAPI() {
    try {
      const response = await AxiosClient.get(
        `idea/new-ideas-per-week-in-month`
      );
      return response;
    } catch (error) {
      throw error.response;
    }
  }
  static async getIdeasByUserId(userId) {
    try{
      const response = await AxiosClient.get(`idea/userId/${userId}`);
      return response;
    }
    catch(error){
      throw error.response;
    }
  }
  static async getIdeaByIdAPI(ideaId) {
    try{
      const response = await AxiosClient.get(`idea/${ideaId}`);
      return response;
    }
    catch(error){
      throw error.response;
    }
  }
}
