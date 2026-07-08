"use client";

import { useState, useRef } from "react";
import { Upload, FileImage, Activity } from "lucide-react";
import MedicalLoading from "./Loading";

/*
  props:
    - onAnalyze(file): با کلیک روی "شروع تحلیل"، فایل واقعی (File) را به والد می‌دهد
    - isAnalyzing: غیرفعال کردن دکمه در حین تحلیل
*/
export default function UploadZone({ onAnalyze, isAnalyzing }) {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    if (files && files[0]) setFile(files[0]);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`relative rounded-3xl border-2 border-dashed transition-colors duration-200 ${
        dragOver ? "border-[#0E7C7B] bg-[#EAF7F6]" : "border-[#BFE3E1] bg-white"
      } p-8 sm:p-12 text-center`}
    >
      {/* گوشه‌های متقاطع شبیه برگه آزمایش */}
      <span className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#0E7C7B]/30 rounded-tr" />
      <span className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#0E7C7B]/30 rounded-tl" />
      <span className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#0E7C7B]/30 rounded-br" />
      <span className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#0E7C7B]/30 rounded-bl" />

      <div className="mx-auto w-16 h-16 rounded-2xl bg-[#0E7C7B]/10 flex items-center justify-center mb-5">
      
        {file ? (
          <FileImage className="w-8 h-8 text-[#0E7C7B]" strokeWidth={1.75} />
        ) : (
          <Upload className="w-8 h-8 text-[#0E7C7B]" strokeWidth={1.75} />
        )}
      </div>

      {file ? (
        <>
          <p className="text-[#0B2B2E] font-bold mb-1 break-all">{file.name}</p>
          <p className="text-sm text-[#5C7A7C] mb-6">آماده برای تحلیل</p>
        </>
      ) : (
        <>
          <p className="text-[#0B2B2E] font-bold text-lg mb-1">
            عکس برگه آزمایش را اینجا آپلود کنید
          </p>
          <p className="text-sm text-[#5C7A7C] mb-6">
            فرمت‌های JPG ، PNG و JPEG — حداکثر حجم ۱۰ مگابایت
          </p>
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => inputRef.current?.click()}
          disabled={isAnalyzing}
          className="px-6 py-3 rounded-xl bg-[#0E7C7B] text-white font-bold text-sm hover:bg-[#0B6564] transition-colors shadow-sm shadow-[#0E7C7B]/20 disabled:opacity-60"
        >
          انتخاب فایل
        </button>
        {file && (
          <button
            onClick={() => onAnalyze(file)}
            disabled={isAnalyzing}
            className="px-6 py-3 rounded-xl bg-[#0B2B2E] text-white font-bold text-sm hover:bg-[#0B2B2E]/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Activity className="w-4 h-4 animate-pulse" />
                در حال تحلیل...
              </>
            ) : (
              "شروع تحلیل با هوش مصنوعی"
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
