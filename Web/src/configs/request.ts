import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";

interface requestParams {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	route: string;
	body?: Object;
	includeheaders?: boolean;
}

export const sendRequest = async (params: requestParams) => {

    console.log(params);
    

	params.method = params.method || "GET";
    params.includeheaders = params.includeheaders || true;

	if (!params.route) throw Error("route required");

	const headers: Record<string, string> = params.includeheaders
                            ? {
                                Authorization: `Bearer $token`,
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

        return response.data;

    } catch (err) {
        throw err;
    }
};
