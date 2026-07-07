import axios from "axios";

const TOKEN_KEY = "lab_sense_token";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 1000000,
});

// Request interceptor — افزودن توکن احراز هویت
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "خطایی رخ داده است";
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;

// ---------- Auth ----------
export const authApi = {
  sendOtp: (phone) =>
    axiosInstance.post("/auth/send-otp", { phone }).then((res) => res.data),

  verifyOtp: (phone, code) =>
    axiosInstance.post("/auth/verify-otp", { phone, code }).then((res) => res.data),

  me: () => axiosInstance.get("/auth/me").then((res) => res.data),

  logout: () => axiosInstance.post("/auth/logout").then((res) => res.data),
};

// ---------- Payments ----------
export const paymentApi = {
  /*
    payload:
      - { type: "first_analysis" }
      - { type: "bundle", bundle_id: "single" | "triple" | "ten" }
    خروجی: { payment_url }
  */
  initiate: (payload) =>
    axiosInstance.post("/payments/initiate", payload).then((res) => res.data),
};

// ---------- Analyses ----------
export const analysisApi = {
  /*
    file: یک فایل تصویر (File)
    خروجی: { id, result, credits_remaining }
    نکته: تحلیل تصویر ممکن است طول بکشد، timeout بالاتری ست شده است.
  */
  create: (file) => {
    const formData = new FormData();
    formData.append("image", file);

    return axiosInstance
      .post("/analyses", formData, { timeout: 120000 })
      .then((res) => res.data);
  },

  // تاریخچه تحلیل‌ها — برای نوار کناری
  list: () => axiosInstance.get("/analyses").then((res) => res.data),

  // نتیجه کامل یک تحلیل
  get: (id) => axiosInstance.get(`/analyses/${id}`).then((res) => res.data),
};