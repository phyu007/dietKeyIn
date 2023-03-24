import { axiosClient } from "./apiClient";

export const loginUser = async(username, password) => {
    return await axiosClient.post('/users/login', null, {
      params: {
        username,
        password
      }
    })
}

export const getAllUrineAnalysisResults = async () => {
    return await axiosClient.get('/urine_analysis')
}

export const postDiet = async(dietList) => {
  console.log("This dietlist posted",dietList)
  return await axiosClient.post('/insertUrine', dietList)
}


  
