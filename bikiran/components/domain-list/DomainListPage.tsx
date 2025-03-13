"use client";
import { FC } from "react";
import DomainListProvider from "./context/DomainListProvider";
import DomainListTable from "./DomainListTable";
import DomainListHeader from "./DomainListHeader";

const DomainListPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <DomainListProvider query={query}>
      <section>
        <DomainListHeader />
      </section>
      <section className="overflow-visible custom-scrollbar">
        <DomainListTable />
      </section>
    </DomainListProvider>
  );
};

export default DomainListPage;
