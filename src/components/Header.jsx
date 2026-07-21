"use client";

import {
  ChevronDown,
  CreditCard,
  History,
  LogOut,
  Menu,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useLogout, useUser } from "@/lib/hooks/useAuth";
import { NAV_ITEMS } from "@/lib/navigation";
import CreditBadge from "./payment/CreditBadge";

/*
  Header
  ----------------------------
  props:
    - onMenuClick(): باز کردن سایدبار موبایل (منوی سایت) — برای همه کاربران
    - onLoginClick(): باز کردن دیالوگ ورود (OTP) برای کاربران مهمان
*/
export default function Header({ onMenuClick, onLoginClick }) {
  const { data: user } = useUser();
  const { mutate: handleLogout } = useLogout();
  const pathname = usePathname();

  return (
    <header className="relative border-b border-[#E0F1EF] bg-white/70 backdrop-blur sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="sm:hidden -ml-1 w-9 h-9 rounded-lg flex items-center justify-center text-[#5C7A7C] hover:bg-[#F4FBFA] hover:text-[#0E7C7B] transition-colors"
              title="منو"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Lab Lens"
              className="w-auto h-28 object-contain mt-2"
            />
          </Link>
        </div>

        {/* منوی سایت — فقط دسکتاپ */}
        <nav className="hidden sm:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.replace(/#.*$/, "")) &&
                  !item.href.includes("#");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                  isActive
                    ? "text-[#0E7C7B] bg-[#0E7C7B]/10"
                    : "text-[#5C7A7C] hover:text-[#0E7C7B] hover:bg-[#F4FBFA]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {!user ? (
          <Button variant="outline" size="sm" onClick={onLoginClick}>
            ورود
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="sm" />}
            >
              <span className="w-6 h-6 rounded-full bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-[#0E7C7B]" />
              </span>
              <span
                className="hidden sm:inline text-xs font-bold"
                style={{ fontFamily: "var(--font-mono)" }}
                dir="ltr"
              >
                {user.phone}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5C7A7C]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <span className="flex flex-col gap-1.5 py-0.5">
                    <span
                      className="text-xs font-bold text-[#0B2B2E]"
                      style={{ fontFamily: "var(--font-mono)" }}
                      dir="ltr"
                    >
                      {user.phone}
                    </span>
                    <CreditBadge credits={user.credits} />
                  </span>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  render={<Link href="/profile" />}
                  className="cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  پروفایل من
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={<Link href="/profile?tab=analyses" />}
                  className="cursor-pointer"
                >
                  <History className="w-4 h-4" />
                  تحلیل‌های من
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={<Link href="/profile?tab=payments" />}
                  className="cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  پرداخت‌ها
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
                onClick={() => handleLogout()}
              >
                <LogOut className="w-4 h-4" />
                خروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
