import { createContext, ReactNode, useContext, useState } from "react";
import LayoutProvider from "@/bik-lib/context/LayoutProvider";
import TemplateProvider from "@/bik-lib/context/template/TemplateProvider";
import CookiesAcceptPopup from "@/bik-lib/features/cookie/CookiesAcceptPopup";
import AppProvider from "@/bik-lib/context/AppProvider";
import ComposeProviders from "@/bik-lib/lib/ComposeProviders";
import { TooltipProvider } from "@/bikiran/components/ui/tooltip";
import FixedHeaderControl from "@/bikiran/shared/header/FixedHeaderControl";
import HeaderSection from "@/bikiran/shared/header/HeaderSection";
import SideNavPage from "@/bikiran/shared/sideNav/SideNavPage";

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
        <HeaderSection />

        <div className="ml-[230px]">{children}</div>
      </main>

      {/* Accept Cookies */}
      <CookiesAcceptPopup />
    </ComposeProviders>
  );
}
