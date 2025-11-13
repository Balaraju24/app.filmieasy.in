import React, { useState } from "react";
import { Upload, MoreVertical } from "lucide-react";
import Image from "@/assets/image.webp";

export default function DocumentsAndFiles() {
  const [files, setFiles] = useState([
    { name: "Blank Document Name", size: "45 KB", type: "doc" },
    { name: "Blank Document Name", size: "45 KB", type: "doc" },
    { name: "Document Name", size: "63 KB", type: "pdf" },
    { name: "Image", size: "64 KB", type: "img" },
    { name: "Blank Document Name", size: "45 KB", type: "doc" },
    { name: "Document Name", size: "63 KB", type: "pdf" },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = Array.from(e.target.files || []).map((f) => ({
      name: f.name,
      size: `${(f.size / 1024).toFixed(1)} KB`,
      type: f.type.includes("image") ? "img" : "doc",
    }));
    setFiles((prev) => [...prev, ...uploaded]);
  };

  return (
    <div className="min-h-screen w-full flex p-4 gap-4 text-white items-start justify-center">
      <div className="w-2/3 grid grid-cols-5 gap-x-16 gap-y-6 items-start justify-center">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="bg-neutral-800 border border-neutral-700 rounded-md overflow-hidden flex flex-col"
          >
            <div className="h-20 w-full bg-neutral-700 flex items-center justify-center text-gray-400">
              {file.type === "img" ? (
                <div className="h-20 w-full bg-neutral-600 flex items-center justify-center">
                          <img src={Image} alt={Image} className="w-full h-20 transition-transform duration-300" />

                </div>
              ) : (
                <div className="text-4xl">📄</div>
              )}
            </div>

            <div className="p-2 px-3">
              <p className="text-sm truncate text-left">{file.name}</p>
              <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                <span>{file.size}</span>
                <MoreVertical className="h-2 w-2 cursor-pointer opacity-70 hover:opacity-100 transition" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/3 min-h-screen  border-l border-neutral-700  p-4 flex flex-col">
        <h3 className="text-lg font-semibold mb-4">📄 Documents & Files</h3>
        <div className="p-3 border-2 py-[2em] border-dashed border-neutral-600 rounded-lg flex flex-col items-center justify-center text-center">
          <Upload className="h-10 w-10 opacity-60 mb-3" />
          <p className="text-sm">Drop a file or click browse</p>
          <p className="text-xs text-gray-400 mb-3">
            Files with up to 10,000 words work best
          </p>
          <label className="cursor-pointer bg-neutral-700 px-4 py-2  rounded-md hover:bg-neutral-600 transition">
            Browse
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
}