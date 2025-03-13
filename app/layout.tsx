import { ReactNode } from "react";
import localFont from "next/font/local";
import InitProvider from "@/bik-lib/context/InitProvider";
import Com2Provider from "@/bik-lib/context/auth/Com2Provider";
import Auth2Provider from "@/bik-lib/context/auth/Auth2Provider";
import ComposeProviders from "@/bik-lib/lib/ComposeProviders";
import "@/bikiran/styles/styles.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getMode } from "@/bik-lib/utils/Env";
import dynamic from "next/dynamic";
const CrispWithNoSSR = dynamic(() => import("@/bik-lib/utils/crisp"));

export const poppins = localFont({
  src: [
    {
      path: "../public/assets/fonts/Poppins-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/assets/fonts/Poppins-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/assets/fonts/Poppins-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../public/assets/fonts/Poppins-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Bikiran Admin",
  description: "Bikiran Admin Panel",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <ComposeProviders
          components={[Com2Provider, InitProvider, Auth2Provider]}
        >
          <main> {children}</main>
        </ComposeProviders>
      </body>
    </html>
  );
}
