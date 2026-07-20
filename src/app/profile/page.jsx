"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FlaskConical, LogIn, Receipt, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ProfileHeader from "@/components/profile/ProfileHeader";
import AnalysesTab from "@/components/profile/AnalysesTab";
import PaymentsTab from "@/components/profile/PaymentsTab";
import AuthDialogs from "@/components/auth/AuthDialogs";
import { useUser } from "@/lib/hooks/useAuth";
import { getToken } from "@/lib/api";

/*
  صفحه پروفایل کاربر (/profile)
  ----------------------------
  - تب «تحلیل‌های من»: تاریخچه تحلیل‌ها (موفق و ناموفق) با فیلتر
  - تب «پرداخت‌ها»: تاریخچه پرداخت‌ها
  - پشتیبانی از ?tab=analyses|payments (لینک‌های dropdown هدر)
  - اگر کاربر لاگین نباشد، دعوت به ورود نمایش داده می‌شود
*/
function ProfileContent() {
  const { data: user, isLoading } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [authOpen, setAuthOpen] = useState(false);

  const tabParam = searchParams.get("tab");
  const activeTab = tabParam === "payments" ? "payments" : "analyses";

  const handleTabChange = (tab) => {
    router.replace(`${pathname}?tab=${tab}`, { scroll: false });
  };

  // در حال دریافت اطلاعات کاربر (توکن موجود است)
  if (isLoading && getToken()) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-28 rounded-2xl bg-[#E0F1EF]/60" />
        <Skeleton className="h-64 rounded-2xl bg-[#E0F1EF]/60" />
      </div>
    );
  }

  // کاربر مهمان — دعوت به ورود
  if (!user) {
    return (
      <div className="rounded-2xl border border-[#E0F1EF] bg-white py-16 px-6 text-center max-w-md mx-auto">
        <span className="mx-auto w-14 h-14 rounded-full bg-[#0E7C7B]/10 flex items-center justify-center">
          <User className="w-6 h-6 text-[#0E7C7B]" />
        </span>
        <h1 className="mt-4 font-extrabold text-lg text-[#0B2B2E]">
          پروفایل کاربری
        </h1>
        <p className="mt-2 text-sm text-[#5C7A7C] leading-7">
          برای مشاهده تحلیل‌ها و تاریخچه پرداخت‌های خود، ابتدا وارد شوید.
        </p>
        <Button
          className="mt-5 bg-[#0E7C7B] hover:bg-[#0B6564]"
          onClick={() => setAuthOpen(true)}
        >
          <LogIn className="w-4 h-4" />
          ورود به حساب
        </Button>
        <AuthDialogs open={authOpen} onOpenChange={setAuthOpen} />
      </div>
    );
  }

  return (
    <div className="space-y-6 ">
      <h1 className="font-extrabold text-xl sm:text-2xl">پروفایل من</h1>

      <ProfileHeader user={user} />

      <Tabs
        dir="rtl"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="bg-white border border-[#E0F1EF] h-11 p-1 rounded-xl w-full sm:w-fit">
          <TabsTrigger
            value="analyses"
            className="rounded-lg px-4 font-bold data-[state=active]:bg-[#0E7C7B]/10 data-[state=active]:text-[#0E7C7B]"
          >
            <FlaskConical className="w-4 h-4" />
            تحلیل‌های من
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="rounded-lg px-4 font-bold data-[state=active]:bg-[#0E7C7B]/10 data-[state=active]:text-[#0E7C7B]"
          >
            <Receipt className="w-4 h-4" />
            پرداخت‌ها
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyses" className="mt-4">
          <AnalysesTab />
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
          <PaymentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <Skeleton className="h-28 rounded-2xl bg-[#E0F1EF]/60" />
          <Skeleton className="h-64 rounded-2xl bg-[#E0F1EF]/60" />
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
