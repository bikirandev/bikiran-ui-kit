import { FC } from "react";
import DomainListWeb from "./layouts/DomainListWeb";
import { useDomainList } from "./context/DomainListProvider";
import { SIZE_MD, useLayout } from "@/bik-lib/context/LayoutProvider";
import DomainListMobile from "./layouts/DomainListMobile";
import { Pagination } from "bik-utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const DomainListTable: FC = () => {
  const { loading, domainListData, pagination } = useDomainList();
  const { windowWidth } = useLayout();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("CurrentPage")) || 1;
  const makeUrl = (num: number) => {
    const queries = new URLSearchParams(searchParams.toString());
    queries.set("CurrentPage", num.toString());
    return `${pathname}?${queries.toString()}`;
  };

  return (
    <div>
      {windowWidth > SIZE_MD ? (
        <DomainListWeb data={domainListData} />
      ) : (
        <DomainListMobile data={domainListData} />
      )}
      <Pagination
        data={pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || domainListData?.length === 0}
      />
    </div>
  );
};

export default DomainListTable;
