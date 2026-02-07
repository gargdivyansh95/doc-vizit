import axios from "axios";

export async function axiosRequestPromise(url, options) {
    try {
        console.log("RQ::options", options)
        options.url = url;
        const response = await axios.request(options)
        return response;
    } catch (error) {
        throw error;
    }
}