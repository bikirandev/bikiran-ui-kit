"use client";
import { FC } from "react";
import UserListProvider from "./context/UserListProvider";
import UserListHeader from "./UserListHeader";
import UserListTable from "./UserListTable";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import UserSideBarSection from "./user-sidebar-section/UserSideBarSection";
import { CustomSidebar } from "bik-utils";
import { usePathname } from "next/navigation";

const UserListPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { modalData } = useTemplate();

  return (
    <UserListProvider query={query}>
      <section>
        <UserListHeader />
      </section>
      <section className="overflow-auto custom-scrollbar">
        <UserListTable />

        <CustomSidebar
          usePathname={usePathname}
          useTemplate={useTemplate}
          className="!pt-0"
        >
          <UserSideBarSection data={modalData} />
        </CustomSidebar>
      </section>
    </UserListProvider>
  );
};

export default UserListPage;
