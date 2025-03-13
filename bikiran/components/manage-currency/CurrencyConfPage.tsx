"use client";
import React, { FC } from "react";

import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import CurrencyConfTableSection from "./CurrencyConfTableSection";
import { CurrencyConfProvider } from "./context/CurrencyConfProvider";
import CurrencyConfHeaderSection from "./CurrencyConfHeaderSection";
import ModalStatusChange from "./modals/ModalStatusChange";

const CurrencyConfPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { authInfo } = useAuth2();

  return (
    <CurrencyConfProvider authInfo={authInfo} query={query}>
      <div className="admin-section">
        <CurrencyConfHeaderSection />
        <CurrencyConfTableSection />
      </div>
      <ModalStatusChange />
    </CurrencyConfProvider>
  );
};

export default CurrencyConfPage;
