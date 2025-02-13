import Request from "./Request";

export const uploadFile = async (file: File, folder: string) => {
  try {
    let url: string = import.meta.env.VITE_API_STORAGE + "?";
    if (folder) url += `folder=${folder}`;

    const formData = new FormData();
    formData.append("file", file);
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const response = await Request.post(url, formData, { headers });
    return response.data;
  } catch (error) {    
    throw error;
  }
};

export const deleteFile = async (filePath: string) => {
  try {
    let url: string = import.meta.env.VITE_API_STORAGE + "?";
    if (filePath) url += `filePath=${filePath}`;

    const response = await Request.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
