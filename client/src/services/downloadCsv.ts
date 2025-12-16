import axios from "axios";

export async function downloadCsv(downloadUrl: string) {
  const response = await axios.get(`http://localhost:5000${downloadUrl}`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "result.csv";
  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
