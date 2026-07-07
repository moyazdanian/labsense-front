import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, setToken, clearToken, getToken } from "../api";
import { toast } from "sonner";

/*
  useSendOtp
  ----------------------------
  mutate(phone) -> ارسال کد OTP به شماره موبایل
*/
export function useSendOtp() {
  return useMutation({
    mutationFn: (phone) => authApi.sendOtp(phone),
  });
}

/*
  useVerifyOtp
  ----------------------------
  mutate({ phone, code }) -> تایید کد و ورود کاربر

  در صورت موفقیت:
  - توکن در localStorage ذخیره می‌شود
  - کاربر مستقیماً در کش react-query با کلید ['user'] قرار می‌گیرد
    تا useUser() بدون نیاز به یک درخواست جدید، فوراً مقدار جدید را برگرداند
*/
export function useVerifyOtp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ phone, code }) => authApi.verifyOtp(phone, code),
    onSuccess: (data) => {
      setToken(data.token);
      toast.success('خوش آمدید!')
      queryClient.setQueryData(["user"], {
        id: data.user.id,
        phone: data.user.phone,
        credits: data.user.credits,
        has_used_first_offer: data.user.has_used_first_offer,
      });
    },
  });
}

/*
  useUser
  ----------------------------
  اطلاعات کاربر فعلی را برمی‌گرداند.
  - فقط زمانی درخواست /auth/me زده می‌شود که توکن وجود داشته باشد
  - اگر توکن نباشد یا کاربر خارج شده باشد، data برابر undefined/null خواهد بود
*/
export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.me,
    enabled: !!getToken(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

/*
  useLogout
  ----------------------------
  - درخواست خروج را به سرور می‌فرستد (برای حذف توکن سمت سرور)
  - فارغ از موفقیت/شکست درخواست، توکن محلی را پاک می‌کند
  - کش ['user'] را خالی می‌کند تا تمام بخش‌های وابسته (سایدبار و ...) فوراً به‌روز شوند
*/
export function useLogout() {
  const queryClient = useQueryClient();

  const cleanup = () => {
    clearToken();
    toast.success('خارج شدید!')
    queryClient.setQueryData(["user"], null);
    queryClient.removeQueries({ queryKey: ["user"] });
  };

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: cleanup,
    onError: cleanup, // حتی اگر درخواست logout fail شود، کاربر سمت کلاینت خارج شود
  });
}
