"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ImageUploader({ value, onChange }) {
  const [preview, setPreview] = useState(
    typeof value === "string" ? value : null
  );

  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
  };

  return (
    <div className="space-y-3">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Choose / Edit Button */}
      <Button type="button" variant="secondary" onClick={openFilePicker}>
        {preview ? "Edit file" : "Choose file"}
      </Button>

      {/* Preview */}
      {preview && (
        <div className="relative w-32 h-32">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="rounded-md object-cover"
          />
        </div>
      )}
    </div>
  );
}
