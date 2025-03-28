import { createContext, ReactNode, useContext, useState } from "react";
import LayoutProvider from "@/bik-lib/context/LayoutProvider";
import TemplateProvider from "@/bik-lib/context/template/TemplateProvider";
import CookiesAcceptPopup from "@/bik-lib/features/cookie/CookiesAcceptPopup";
import AppProvider from "@/bik-lib/context/AppProvider";
import ComposeProviders from "@/bik-lib/lib/ComposeProviders";
import { TooltipProvider } from "@/bikiran/components/ui/tooltip";
import SideNavPage from "@/bikiran/shared/sideNav/SideNavComp";
import Footer from "@/bikiran/shared/footer/Footer";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ComposeProviders
      components={[
        TemplateProvider,
        AppProvider,
        LayoutProvider,
        TooltipProvider,
      ]}
    >
      <main>
        <SideNavPage />

        <div className="md:ml-[230px] mt-[0px] overflow-scroll custom-scrollbar h-screen">
          {children}
        </div>
      </main>

      {/* Accept Cookies */}
      <CookiesAcceptPopup />
    </ComposeProviders>
  );
}
