"use client";
import React, { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import ClientInfoTableSection from "./ClientInfoTableSection";
import ClientInfoHeaderSection from "./ClientInfoHeaderSection";
import { ClientInfoProvider } from "./context/ClientInfoProvider";
import ModalAddClient from "./modals/ModalAddClient";
import ModalUpdateClient from "./modals/ModalUpdateClient";
import ModalUpdateClientLogo from "./modals/ModalUpdateClientLogo";
import ClientInfoTableHeaderComp from "./ClientInfoTableHeaderComp";
import ModalStatusChange from "./modals/ModalStatusChange";

const ClientInfoPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { authInfo } = useAuth2();

  return (
    <ClientInfoProvider authInfo={authInfo} query={query}>
      <div className="admin-section">
        <ClientInfoHeaderSection />
        <ClientInfoTableSection />
      </div>

      {/* modals */}
      <ModalAddClient />
      <ModalUpdateClient />
      <ModalUpdateClientLogo />
      <ModalStatusChange />
    </ClientInfoProvider>
  );
};

export default ClientInfoPage;
