import Bottleneck from "bottleneck";
import HTTP from "../services/HttpService.js";

// Initialize a rate limiter: 10 requests per minute
const limiter = new Bottleneck({
    minTime: (60 / 10) * 1000, // Spacing requests 6 seconds apart
});

export const fetchFootballData = async (endpoint: string) => {
    try {
        const response = await limiter.schedule(() =>
            HTTP.get(`${process.env.FOOTBALL_DATA_API_URL}${endpoint}`, {
                "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
            })
        );
        return response.data;
    } catch (error) {
        throw new Error("API request limit reached. Please try again later.");
    }
};
