import axios from "axios";

// const apiKey = process.env.REACT_APP_APIKEY;

export const axiosClient = axios.create({
    baseURL: ``,
    headers: {
        "Content-Type": "application/json",
        // "x-api-key": apiKey,
    },
    // withCredentials: false
})