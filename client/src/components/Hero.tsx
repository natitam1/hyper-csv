import React, { useRef, useState } from "react";
import axios from "axios";

const Hero = () => {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState(null);
  const [error, setError] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setDownloadLink(null);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/csv/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (!event.total) return;
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          },
        }
      );

      setDownloadLink(res.data.downloadLink);
    } catch (err) {
      setError("Failed to upload or process CSV");
    } finally {
      setUploading(false);
      e.target.value = ""; // reset input
    }
  };

  const handleDownload = async () => {
    if (!downloadLink) return;

    const response = await axios.get(`http://localhost:5000${downloadLink}`, {
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
  };

  return (
    <section className="relative flex flex-col items-center bg-white text-black min-h-screen pb-20 px-4">
      {/* Hero Text */}
      <h1 className="text-4xl md:text-6xl text-center font-extrabold max-w-4xl mt-40 tracking-tight">
        Fullstack Developer Test
      </h1>

      <p className="text-gray-600 md:text-lg text-center max-w-xl mt-4">
        Upload large CSV files, process sales data efficiently, and download
        aggregated results — built for performance and scalability.
      </p>

      {/* Hidden File Input */}
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* CTA */}
      <div className="flex flex-col items-center gap-4 mt-10">
        <button
          onClick={handleUploadClick}
          disabled={uploading}
          className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-900 transition font-medium disabled:opacity-60"
        >
          <span>{uploading ? "Uploading..." : "Upload CSV"}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Progress */}
        {uploading && (
          <p className="text-sm text-gray-600">Upload progress: {progress}%</p>
        )}

        {/* Download */}
        {downloadLink && (
          <button
            onClick={handleDownload}
            className="text-sm font-medium text-blue-600 underline"
          >
            Download processed CSV
          </button>
        )}

        {/* Error */}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      {/* Trusted By */}
      <div className="mt-28 flex flex-col items-center">
        <p className="text-gray-500 text-sm mb-10 uppercase tracking-wide">
          Trusted by developers & teams from
        </p>

        <div className="flex flex-wrap items-center justify-center gap-14 opacity-70">
          <span className="text-xl font-semibold">Mereb Tech</span>
          <span className="text-xl font-semibold">Hyper</span>
          <span className="text-xl font-semibold">Open Source</span>
          <span className="text-xl font-semibold">Startups</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
