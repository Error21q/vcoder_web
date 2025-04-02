import Request from "./Request";

export const getScreenshot = async (uri: string) => {
  try {
    let url: string = import.meta.env.VITE_API_SCREENSHOT + "?";
    if (uri) url += `url=${uri}`;

    const response = await Request.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
