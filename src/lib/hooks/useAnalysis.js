import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { analysisApi, getToken } from "../api";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useLoading } from "../contexts/LoadingContext";
import { useStage } from "../contexts/StageContext";

/*
  useCreateAnalysis
  ----------------------------
  mutate(file) -> آپلود تصویر و ثبت تحلیل در صف (پاسخ فوری با status=pending)
*/
export function useCreateAnalysis() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file) => analysisApi.create(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["analyses"] });
    },
  });
}

/*
  useAnalysisHistory
  ----------------------------
  تاریخچه تحلیل‌های کاربر (برای صفحه پروفایل).
  اگر تحلیل pending وجود داشته باشد، هر ۵ ثانیه یک‌بار refetch می‌شود.
  وقتی تحلیلی از pending به completed تبدیل شد، یک toast نمایش داده می‌شود.
*/
export function useAnalysisHistory() {
  const queryClient = useQueryClient();
  const prevDataRef = useRef(null);
  const {hideLoading} = useLoading();
  const {successStage , errorStage} = useStage();

  const query = useQuery({
    queryKey: ["analyses"],
    queryFn: analysisApi.list,
    enabled: !!getToken(),
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!Array.isArray(data)) return false;
      return data.some((a) => a.status === "pending") ? 5000 : false;
    },
  });

  useEffect(() => {
    const prev = prevDataRef.current;
    const curr = query.data;

    if (prev && curr) {
      curr.forEach((item) => {
        const prevItem = prev.find((p) => p.id === item.id);
        if (prevItem?.status === "pending" && item.status === "completed") {
          queryClient.invalidateQueries({ queryKey: ["user"] });
          hideLoading();
          successStage();
          toast.success(
            <span>
              تحلیل <strong>{item.fileName}</strong> آماده شد!{" "}
              <a
                href={`/analysis/${item.id}`}
                className="underline font-bold text-[#0E7C7B]"
              >
                مشاهده نتیجه
              </a>
            </span>,
            { duration: 8000 }
          );
        }
        if (prevItem?.status === "pending" && item.status === "failed") {
          errorStage();
          toast.error(`تحلیل ${item.fileName} با خطا مواجه شد.`);
        }
      });
    }

    prevDataRef.current = curr ?? prev;
  }, [query.data, queryClient]);

  return query;
}

export function useGetAnalysis(id) {
  return useQuery({
    queryKey: ["analysis", id],
    queryFn: () => analysisApi.get(id),
    enabled: !!id,
  });
}