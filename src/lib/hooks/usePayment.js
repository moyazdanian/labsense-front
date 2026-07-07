import { useMutation } from "@tanstack/react-query";
import { paymentApi } from "../api";

/*
  useInitiatePayment
  ----------------------------
  mutate({ type: "first_analysis" })
  mutate({ type: "bundle", bundle_id: "triple" })

  در صورت موفقیت، payment_url برمی‌گردد. کاربر باید به این آدرس ریدایرکت شود
  (window.location.href) تا به درگاه زرین‌پال برود.
*/
export function useInitiatePayment() {
  return useMutation({
    mutationFn: (payload) => paymentApi.initiate(payload),
  });
}
