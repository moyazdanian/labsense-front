// hooks/mutations/useUploadImage.js
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/lib/api/upload";

export function useUploadImage() {
  const mutation = useMutation({
    mutationFn: (image) => uploadImage(image),
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isLoading: mutation.isLoading,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}
