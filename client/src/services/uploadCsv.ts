import { api } from "../lib/api";

export async function uploadCsv(
  file: File,
  onProgress?: (percent: number) => void
) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/csv/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (!progressEvent.total) return;
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgress?.(percent);
    },
  });

  return response.data as {
    message: string;
    downloadLink: string;
  };
}
