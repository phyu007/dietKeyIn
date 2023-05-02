import axios from "axios";

// const apiKey = process.env.REACT_APP_APIKEY;

export const axiosClient = axios.create({
  baseURL: `https://19k36m49u9.execute-api.us-east-1.amazonaws.com/prod`,
  headers: {
    "Content-Type": "application/json",
    // "x-api-key": apiKey,
  },
  // withCredentials: false
});

export const axiosClient1 = axios.create({
  baseURL: `https://beph9r2av8.execute-api.ap-southeast-1.amazonaws.com/v1`,
  headers: {
    "Content-Type": "application/json",
    // "x-api-key": apiKey,
  },
  // withCredentials: false
});
