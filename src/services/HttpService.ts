import axios, { AxiosResponse } from "axios";

class HttpService {
    async get(
        url: string,
        headers: Record<string, string> = {}
    ): Promise<AxiosResponse> {
        try {
            return await axios.get(url, { headers });
        } catch (error) {
            console.error("HTTP GET request failed:", error);
            throw error;
        }
    }
}

export default new HttpService();
