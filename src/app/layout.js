import "./globals.css";
import Providers from "./providers/providers";
import localFont from "next/font/local"
import { ThemeProvider } from "./providers/ThemeProviders";
import { Toaster } from "@/components/ui/sonner";
import AppLayout from "@/components/AppLayout";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LoadingProvider } from "@/lib/contexts/LoadingContext";
import Loading from "./loading";

const vazirmatn = localFont({
  src: "../../public/fonts/Vazir.ttf"
})

export const metadata = {
  title: "Lablens- تحلیل آزمایش خون با هوش مصنوعی",
  description: "تحلیل آزمایش خون با هوش مصنوعی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
      <body
        className={vazirmatn.className}
      >
        <ThemeProvider 
          attribute= "class"
          defaultTheme= "system"
          enableSystem
        >
          <Providers>
            <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
            <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          <LoadingProvider>
            <AppLayout>
            {children}
            </AppLayout>
            <Loading />
            </LoadingProvider>
            <Toaster 
            position="top-center" 
            closeButton 
            dir="rtl"
            className="text-red-600"
          />
            </Providers>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
