"use client";

import { useLogout, useUser } from "@/lib/hooks/useAuth";
import { useState } from "react";
import MobileSidebar from "./sidebar/MobileSidebar";
import Header from "./Header";
import AuthDialogs from "./auth/AuthDialogs";
import Footer from "./Footer";

export default function AppLayout({ children }) {
  const { data: user } = useUser();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { mutate: handleLogout } = useLogout();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F4FBFA] text-[#0B2B2E] flex"
      style={{
        fontFamily: "'Vazirmatn', 'Manrope', sans-serif",
        ["--font-mono"]: "'JetBrains Mono', monospace",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800&family=Manrope:wght@500;700;800&family=JetBrains+Mono:wght@500;700&display=swap"
        rel="stylesheet"
      />

      {/* پس‌زمینه دکوراتیو شبکه پزشکی */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#0E7C7B 1px, transparent 1px), linear-gradient(90deg, #0E7C7B 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* سایدبار موبایل — منوی سایت (برای همه کاربران) */}
      <MobileSidebar
        open={mobileSidebarOpen}
        onOpenChange={setMobileSidebarOpen}
        user={user}
        onLoginClick={() => setAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* دیالوگ ورود مشترک (هدر + سایدبار موبایل) */}
      <AuthDialogs open={authOpen} onOpenChange={setAuthOpen} />

      <div className="relative flex-1 min-w-0">
        <Header
          onMenuClick={() => setMobileSidebarOpen(true)}
          onLoginClick={() => setAuthOpen(true)}
        />

        <main className="relative max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
