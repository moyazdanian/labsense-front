"use client";

import { useAnalysisHistory } from "@/lib/hooks/useAnalysis";
import { useLogout, useUser } from "@/lib/hooks/useAuth";
import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import MobileSidebar from "./sidebar/MobileSidebar";
import Header from "./Header";
import AuthDialogs from "./auth/AuthDialogs";
import PaymentDialog from "./payment/PaymentDialog";
import Footer from "./Footer";

export default function AppLayout({ children }) {
  const { data: user } = useUser();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { data: history } = useAnalysisHistory();
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

      {/* نوار کناری — فقط برای کاربران لاگین‌کرده */}
      {user && (
        <>
          <Sidebar
            history={history || []}
            phone={user.phone}
            credits={user.credits}
            onLogout={handleLogout}
          />
          <MobileSidebar
            open={mobileSidebarOpen}
            onOpenChange={setMobileSidebarOpen}
            history={history || []}
            phone={user.phone}
            credits={user.credits}
            onLogout={handleLogout}
          />
        </>
      )}

      <div className="relative flex-1 min-w-0">
        <Header
          onMenuClick={user ? () => setMobileSidebarOpen(true) : undefined}
        />

        <main className="relative max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
