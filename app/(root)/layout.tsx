import { createContext, ReactNode, useContext, useState } from "react";
import LayoutProvider from "@/bik-lib/context/LayoutProvider";
import TemplateProvider from "@/bik-lib/context/template/TemplateProvider";
import CookiesAcceptPopup from "@/bik-lib/features/cookie/CookiesAcceptPopup";
import AppProvider from "@/bik-lib/context/AppProvider";
import ComposeProviders from "@/bik-lib/lib/ComposeProviders";
import { TooltipProvider } from "@/bikiran/components/ui/tooltip";

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
      <main> {children}</main>

      {/* Accept Cookies */}
      <CookiesAcceptPopup />
    </ComposeProviders>
  );
}
