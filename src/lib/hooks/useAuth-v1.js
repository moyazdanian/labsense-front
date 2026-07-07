import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, setToken } from "../api";

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
  در صورت موفقیت، توکن را در localStorage ذخیره می‌کند.
*/
export function useVerifyOtp() {
  return useMutation({
    mutationFn: ({ phone, code }) => authApi.verifyOtp(phone, code),
    onSuccess: (data) => {
      setToken(data.token);
    },
  });
}

export function useUser(){
  return useQuery({
    queryKey:['user'],
    queryFn: authApi.me
  })
}

export function useLogout(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess:()=>{
      
      queryClient.invalidateQueries({queryKey:['user']})
    }
  })
}
