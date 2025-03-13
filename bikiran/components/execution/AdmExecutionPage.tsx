"use client";
import { FC, useState } from "react";
import AdmExecutionProvider from "./context/AdmExecutionProvider";
import AdmExecutionTableSection from "./AdmExecutionTableSection";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AdmExecutionHeaderComp from "./AdmExecutionHeaderComp";

const AdmExecutionPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const [filterState, setFilterState] = useState("all");

  const { authInfo } = useAuth2();

  return (
    <AdmExecutionProvider authInfo={authInfo} query={query}>
      <div className="admin-section">
        <AdmExecutionHeaderComp
        // filterState={filterState}
        // setFilterState={setFilterState}
        />
        <AdmExecutionTableSection filterState={filterState} />
      </div>
    </AdmExecutionProvider>
  );
};

export default AdmExecutionPage;
