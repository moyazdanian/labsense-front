import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { analysisApi, getToken } from "../api";

/*
  useCreateAnalysis
  ----------------------------
  mutate(file) -> آپلود تصویر و دریافت نتیجه تحلیل از هوش مصنوعی

  در صورت موفقیت:
  - ['user'] دوباره fetch می‌شود تا اعتبار جدید (کسر شده توسط سرور) نمایش داده شود
  - ['analyses'] دوباره fetch می‌شود تا تاریخچه به‌روز شود
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
  تاریخچه تحلیل‌های کاربر (برای نوار کناری)
*/
export function useAnalysisHistory() {
  return useQuery({
    queryKey: ["analyses"],
    queryFn: analysisApi.list,
    enabled: !!getToken(),
  });
}
export function useGetAnalysis(id){
  return useQuery({
        queryKey: ["analysis", id],
        queryFn: () => analysisApi.get(id),
        enabled: !!id
      });
}