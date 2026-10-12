import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000",
});
const reportEndpoint =
  import.meta.env.VITE_ADVERSE_REACTION_ENDPOINT || "/api/customer";

// export const submitAdverseReaction = (report) => api.post(reportEndpoint, report)
// export default api

export const submitAdverseReaction = async (report) => {
  try {
    const response = await api.post(reportEndpoint, report);

    console.log("===== BACKEND RESPONSE =====");
    console.log(response);
    console.log("===== BACKEND RESPONSE DATA =====");
    console.log(response.data);

    return response;
  } catch (error) {
    console.error("===== BACKEND ERROR =====");
    console.error(error);

    console.error("===== ERROR RESPONSE DATA =====");
    console.error(error.response?.data);

    throw error;
  }
};
