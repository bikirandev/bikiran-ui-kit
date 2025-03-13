"use client";
import { FC } from "react";
import { useAppsLoadBalancer } from "./context/AppsLoadBalancerProvider";
import AppsLoadBalancerWeb from "./AppsLoadBalancerWeb";
// import Pagination from "@/bikiran/shared/pagination/Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "bik-utils";
import Link from "next/link";
// import { SIZE_MD, useLayout } from "@/bik-lib/context/LayoutProvider";
// import UserListMobile from "./layout/UserListMobile";

const AppsLoadBalancerTable: FC = () => {
  const { loadBalancerData, loading } = useAppsLoadBalancer();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("CurrentPage")) || 1;
  const makeUrl = (num: number) => {
    const queries = new URLSearchParams(searchParams.toString());
    queries.set("CurrentPage", num.toString());
    return `${pathname}?${queries.toString()}`;
  };
  // const { windowWidth } = useLayout();

  return (
    <div>
      <AppsLoadBalancerWeb data={loadBalancerData} />

      {/* {windowWidth > SIZE_MD ? (
        <UserListWeb data={userListData} />
      ) : (
        <UserListMobile data={userListData} />
      )} */}
      <Pagination
        data={loadBalancerData.pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || loadBalancerData?.appsBalancer?.length === 0}
      />
    </div>
  );
};

export default AppsLoadBalancerTable;
