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
      const response = await AxiosClient.get(`idea/author/${userId}`);
      return response;
    }
    catch(error){
      throw error.response;
    }
  }
  static async getIdeaByIdAPI(ideaId, userId) {
    try{
      const response = await AxiosClient.get(`idea/${ideaId}`, userId);
      return response;
    }
    catch(error){
      throw error.response;
    }
  }
  static async likeIdeaByIdAPI(ideaId, userId) {
    try{
      const response = await AxiosClient.post(`idea/like/${ideaId}`, {userId});
      return response;
    }
    catch (error) {
      throw (error.response);
    }
  }
  static async unlikeIdeaByIdAPI(ideaId, userId) {
    try{
      const response = await AxiosClient.post(`idea/unlike/${ideaId}`, {userId});
      return response;
    }
    catch (error) {
      throw (error.response);
    }
  }
}
