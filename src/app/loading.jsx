"use client";
import MedicalLoading from "@/components/Loading";
import { useLoading } from "@/lib/contexts/LoadingContext";

export default function Loading() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-xs rounded-3xl">
      <MedicalLoading />
    </div>
  );
}
