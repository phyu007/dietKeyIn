import { axiosClient } from "./apiClient";

export const loginUser = async (username, password) => {
  return await axiosClient.post("/users/login", null, {
    params: {
      username,
      password,
    },
  });
};

export const getAllUrineAnalysisResults = async () => {
  return await axiosClient.get("/urine_analysis");
};

export const postDiet = async (dietList) => {
  console.log("This dietlist posted", dietList);
  return await axiosClient.post("/insertDiet", dietList);
};

export const getPredictedPH = async (dietList) => {
  return await axiosClient.post("/predictph", dietList);
};

export const login = async (credentials) => {
  console.log("These are credentials", credentials)
  return await axiosClient.post("/login", credentials);
};

export const getfamilymembers = async (account_id) => {
  console.log("This is account_id", account_id)
  const response = await axiosClient.post("/getfamilymembers", account_id);
  console.log("This is response", response.data.body);
  return response.data.body;
};

export const insertDummiesPHtemp = async (selectedInfo) => {
  console.log("This is account_id", selectedInfo)
  const response = await axiosClient.post("/insertdummiesphtemp?deviceid=11", selectedInfo);
  console.log("This is response", response.data.body);
  return response.data.body;
};

export const getRecommendedDiet = async (urine_ph) => {
  console.log("This is urinePH", urine_ph)
  const response = await axiosClient.post("/getRecommendedDiet", urine_ph);
  console.log("This is response", response.data.body);
  return response.data.body;
};

export const updateurineph = async (payload) => {
  console.log("This is updateurineph payload", payload)
  const response = await axiosClient.post("/updateurineph", payload);
  console.log("This is response", response.data.body);
  return response.data.body;
};
