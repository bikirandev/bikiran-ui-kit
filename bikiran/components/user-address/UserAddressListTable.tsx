"use client";
import { FC } from "react";
import { SIZE_MD, useLayout } from "@/bik-lib/context/LayoutProvider";
import UserAddressListWeb from "./layout/UserAddressListWeb";
import { useUserAddressList } from "./context/UserAddressListProvider";
import { Pagination } from "bik-utils";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const UserAddressListTable: FC = () => {
  const { loading, userAddressData, pagination } = useUserAddressList();
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
        <UserEmailsListWeb data={userEmailsData} />
      ) : (
        <UserListMobile data={userEmailsData} />
      )} */}
      <UserAddressListWeb data={userAddressData} />
      <Pagination
        data={pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || userAddressData?.length === 0}
      />
    </div>
  );
};

export default UserAddressListTable;
