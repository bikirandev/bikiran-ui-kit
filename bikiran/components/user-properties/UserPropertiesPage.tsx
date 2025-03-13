"use client";
import React, { FC } from "react";
import UserPropertiesHeader from "./UserPropertiesHeader";
import UserPropertiesTable from "./UserPropertiesTable";
import UserPropertiesProvider from "./context/UserPropertiesProvider";
import ModalStatusChange from "./modal/ModalStatusChange";

const UserPropertiesPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <UserPropertiesProvider query={query}>
      <section>
        <UserPropertiesHeader />
      </section>
      <section>
        <UserPropertiesTable />
      </section>
      {/* modals  */}
      <ModalStatusChange />
    </UserPropertiesProvider>
  );
};

export default UserPropertiesPage;
