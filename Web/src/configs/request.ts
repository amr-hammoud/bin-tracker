import axios from "axios";
import { Token } from "../store/interfaces";

axios.defaults.baseURL = "http://localhost:8000/";

interface requestParams {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	route: string;
	body?: Object;
    token?: Token | null;
	includeheaders?: boolean;
}

export const sendRequest = async (params: requestParams) => {

    console.log(params);
    

	params.method = params.method || "GET";
    params.includeheaders = params.includeheaders || true;

	if (!params.route) throw Error("route required");

	const headers: Record<string, string> = params.includeheaders
                            ? {
                                Authorization: `Bearer ${params.token}`,
                                "Content-Type": "application/json",
                            }
                            : {};
    
    try {

        const response = await axios.request({
            method: params.method,
            url: params.route,
            data: params.body,
            headers,
        });

        return response;

    } catch (err) {
        throw err;
    }
};
