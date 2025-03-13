import { FC } from "react";
import HostingListHeaderSection from "./HostingListHeaderSection";
import HostingListTable from "./HostingListTable";
import HostingListProvider from "./context/HostingListProvider";

const HostingListPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <HostingListProvider query={query}>
      <section>
        <HostingListHeaderSection />
      </section>
      <section>
        <HostingListTable />
      </section>
    </HostingListProvider>
  );
};

export default HostingListPage;
