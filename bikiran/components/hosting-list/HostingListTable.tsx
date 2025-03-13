"use client";
import { FC } from "react";
import { SIZE_MD, useLayout } from "@/bik-lib/context/LayoutProvider";
import UserListMobile from "./layout/HostingListMobile";
import HostingListWeb from "./layout/HostingListWeb";
import { useHostingList } from "./context/HostingListProvider";
import { Pagination } from "bik-utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const HostingListTable: FC = () => {
  const { hostingListData, loading, pagination } = useHostingList();
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
      {/* {windowWidth > SIZE_MD ? (
        <HostingListWeb data={hostingListData} />
      ) : (
        <UserListMobile />
      )} */}
      <HostingListWeb data={hostingListData} />
      <Pagination
        data={pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || hostingListData?.length === 0}
      />
    </div>
  );
};

export default HostingListTable;
