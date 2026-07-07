"use client";

import { useState } from "react";
import SidebarContent from "./SidebarContent";

/*
  Sidebar (دسکتاپ)
  ----------------------------
  نوار کناری جمع‌شونده برای کاربران لاگین‌کرده — فقط در دسکتاپ نمایش داده می‌شود
  (sm به بالا). در موبایل از MobileSidebar (منوی همبرگری) استفاده می‌شود.

  props:
    - history: آرایه تاریخچه (lib/sampleHistory)
    - phone: شماره موبایل کاربر برای نمایش
    - credits: تعداد اعتبار باقی‌مانده
    - onSelectHistory(item)
    - onNewAnalysis()
    - onLogout()
*/
export default function Sidebar(props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden sm:flex flex-col shrink-0 bg-white border-l border-[#E0F1EF] h-screen sticky top-0 transition-all duration-200 ${
        collapsed ? "w-[72px]" : "w-72"
      }`}
    >
      <SidebarContent
        {...props}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />
    </aside>
  );
}
