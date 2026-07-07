import AppShell from "@/components/layout/app-shell";

import HeroSection from "@/components/layout/hero-section";

import UploadPage from "@/components/upload/UploadPage";



export default function HomePage() {

  return (

    <AppShell>

      <HeroSection />

      <div className="mt-12">
        <UploadPage />
      </div>

    </AppShell>

  );

}
