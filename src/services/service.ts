import { ArticleResponse, RequestParams } from "../types";

const API_BASE_URL = "https://articlewebapp-h0heexfzapaga3bw.polandcentral-01.azurewebsites.net";
const API_GET_POST_PATH = "article/similar/";

export class ApiService {
  static async fetchPosts(params: RequestParams): Promise<ArticleResponse> {
    try {
      const queryParams = new URLSearchParams({
        article_id: params.article_id,
        site: params.site,
        id_type: params.id_type,
        ...(params.top_n && { top_n: params.top_n.toString() }), // Add top_n only if it's provided
      }).toString();

      const url = new URL(
        `${API_BASE_URL}/${API_GET_POST_PATH}?${queryParams}`,
      );
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ArticleResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }
}
