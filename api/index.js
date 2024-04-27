import axios from "axios";
const API_KEY = "8619582-14fdaf1fbc68cf64562dfcc2c";

const URL = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => {
  let url = URL + "&per_page=25&safesearch=true&editors_choice=true";
  if (!params) return url;
  const paramsKey = Object.keys(params);
  paramsKey.forEach((key) => {
    const value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  return url;
};

export const apiCall = async (params) => {
  try {
    console.log("url", formatUrl(params));
    const response = await axios.get(formatUrl(params));
    const { data } = response;
    return { success: true, data };
  } catch (error) {
    return { success: false, msg: error.message };
  }
};
