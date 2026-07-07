"use client";

import { Activity, HeartPulse, Microscope, Stethoscope } from "lucide-react";

export default function MedicalLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* هدر با آیکون پزشکی */}
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-10 h-10 rounded-full bg-[#0E7C7B]/10 flex items-center justify-center">
            <Activity className="w-10 h-10 text-[#0E7C7B] animate-pulse" />
          </div>
          {/* حلقه‌های چرخان دور آیکون */}
          <div className="absolute -inset-2 rounded-full border-2 border-t-[#0E7C7B] border-r-transparent border-b-[#0E7C7B]/30 border-l-transparent animate-spin" />
          <div
            className="absolute -inset-4 rounded-full border-2 border-t-transparent border-r-[#0E7C7B] border-b-transparent border-l-[#0E7C7B]/30 animate-spin"
            style={{ animationDuration: "2s" }}
          />
        </div>
        <p className="mt-5 text-sm text-[#5C7A7C] flex items-center justify-center gap-2">
          <span>لطفاً صبر کنید</span>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-[#0E7C7B] rounded-full animate-bounce" />
            <span
              className="w-1.5 h-1.5 bg-[#0E7C7B] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="w-1.5 h-1.5 bg-[#0E7C7B] rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </span>
        </p>
      </div>
    </div>
  );
}
