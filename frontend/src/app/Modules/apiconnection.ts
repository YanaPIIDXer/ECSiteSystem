import axios from 'axios';

const axiosInstance = axios.create(
    {
        baseURL: "http://localhost:3001",
        withCredentials: true
    }
);

interface Response {
    status: number,
    json: any | null
}

class APIConnection {
    async get(api: string): Promise<Response> {
        var response: Response = {
            status: 0,
            json: null
        }

        try {
            const res = await axiosInstance.get(api);
            response.status = res.status;
            response.json = JSON.parse(JSON.stringify(res.data));
        } catch (e) {
            console.log(e);
        }
        return response;
    }

    async post(api: string, params: URLSearchParams): Promise<Response> {
        var response: Response = {
            status: 0,
            json: null
        }

        try {
            const res = await axiosInstance.post(api, params);
            response.status = res.status;
            response.json = JSON.parse(JSON.stringify(res.data));
        } catch (e) {
            console.log(e);
        }
        return response;
    }
}

export default new APIConnection();
