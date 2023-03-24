import axios from "axios";

// const apiKey = process.env.REACT_APP_APIKEY;

export const axiosClient = axios.create({
    baseURL: `https://j5225nczo7.execute-api.us-east-1.amazonaws.com/prod`,
    headers: {
        "Content-Type": "application/json",
        // "x-api-key": apiKey,
    },
    // withCredentials: false
})