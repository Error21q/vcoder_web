import { GetProp, UploadProps } from "antd";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getFileName = (url: string) => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url); // This will throw if the URL is invalid
    return true;
  } catch (error) {
    return false;
  }
};

export const base64ToFile = (base64: string, mimeType: string) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const file = new File([byteArray], "screenshot.png", { type: mimeType });
  return file;
};
