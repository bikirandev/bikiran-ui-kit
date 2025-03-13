import { ReactNode } from "react";
import { TooltipProvider } from "@/bikiran/components/ui/tooltip";
import AppProvider from "@/bik-lib/context/AppProvider";
import LayoutProvider from "@/bik-lib/context/LayoutProvider";
import TemplateProvider from "@/bik-lib/context/template/TemplateProvider";
import ComposeProviders from "@/bik-lib/lib/ComposeProviders";
import AdvMenuProvider from "@/bikiran/shared/adv-menu/AdvMenuProvider";
import AdvMenuLayout from "@/bikiran/shared/adv-menu/AdvMenuLayout";
import HeaderSection from "@/bikiran/shared/header/HeaderSection";
import { CookiesAcceptPopup } from "bik-utils";
import ApiProvider from "@/bik-lib/context/api/ApiProvider";

export const metadata = {
  title: "Bikiran Admin",
  description: "Bikiran Admin Panel",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ComposeProviders
      components={[
        ApiProvider,
        TemplateProvider,
        AppProvider,
        LayoutProvider,
        TooltipProvider,
        AdvMenuProvider,
      ]}
    >
      <HeaderSection />
      <AdvMenuLayout className="">{children}</AdvMenuLayout>
      {/* Accept Cookies */}
      <CookiesAcceptPopup />
    </ComposeProviders>
  );
}
