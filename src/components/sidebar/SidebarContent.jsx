import { PanelRightClose, PanelRightOpen, Plus, History, User, LogOut } from "lucide-react";
import HistoryList from "./HistoryList";
import CreditBadge from "../payment/CreditBadge";

/*
  SidebarContent
  ----------------------------
  محتوای مشترک نوار کناری — هم در نسخه دسکتاپ (Sidebar) و هم در نسخه
  موبایل (MobileSidebar / Sheet) استفاده می‌شود.

  props:
    - history, phone, credits, onSelectHistory, onNewAnalysis, onLogout
    - collapsed: حالت جمع‌شده (فقط دسکتاپ)
    - onToggleCollapse: اگر داده شود، دکمه جمع/باز کردن نمایش داده می‌شود (فقط دسکتاپ)
*/
export default function SidebarContent({
  history,
  phone,
  credits = 0,
  onSelectHistory,
  onNewAnalysis,
  onLogout,
  collapsed = false,
  onToggleCollapse,
}) {
  return (
    <div className="flex flex-col h-full">
      {/* هدر نوار کناری */}
      <div
        className={`flex items-center h-16 border-b border-[#E0F1EF] px-3 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && (
          <span className="text-sm font-extrabold text-[#0B2B2E] flex items-center gap-2">
            <History className="w-4 h-4 text-[#0E7C7B]" />
            تاریخچه آزمایش‌ها
          </span>
        )}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#5C7A7C] hover:bg-[#F4FBFA] hover:text-[#0E7C7B] transition-colors"
            title={collapsed ? "باز کردن نوار کناری" : "جمع کردن نوار کناری"}
          >
            {collapsed ? (
              <PanelRightOpen className="w-4.5 h-4.5" />
            ) : (
              <PanelRightClose className="w-4.5 h-4.5" />
            )}
          </button>
        )}
      </div>

      {/* دکمه تحلیل جدید */}
      <div className="p-3">
        <button
          onClick={onNewAnalysis}
          className={`w-full flex items-center gap-2 rounded-xl bg-[#0E7C7B] text-white font-bold text-sm h-11 hover:bg-[#0B6564] transition-colors ${
            collapsed ? "justify-center px-0" : "justify-center px-4"
          }`}
          title="تحلیل آزمایش جدید"
        >
          <Plus className="w-4 h-4" />
          {!collapsed && "تحلیل جدید"}
        </button>
      </div>

      {/* لیست تاریخچه */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <HistoryList items={history} collapsed={collapsed} onSelect={onSelectHistory} />
      </div>

      {/* کاربر / خروج */}
      <div className="border-t border-[#E0F1EF] p-3 space-y-2">
        {!collapsed && (
          <div className="px-2">
            <CreditBadge credits={credits} />
          </div>
        )}
        <div className={`flex items-center gap-3 rounded-xl px-2 py-2 ${collapsed ? "justify-center" : ""}`}>
          <span className="w-9 h-9 rounded-full bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-[#0E7C7B]" />
          </span>
          {!collapsed && (
            <span className="flex-1 min-w-0">
              <span
                className="block text-sm font-bold text-[#0B2B2E] truncate"
                style={{ fontFamily: "var(--font-mono)" }}
                dir="ltr"
              >
                {phone}
              </span>
              <span className="block text-[11px] text-[#5C7A7C]">کاربر لب‌سنس</span>
            </span>
          )}
          <button
            onClick={onLogout}
            title="خروج"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5C7A7C] hover:bg-[#FBEAEA] hover:text-[#C13434] transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
