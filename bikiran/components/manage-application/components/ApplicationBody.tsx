"use client";

import React from "react";
import ApplicationTableHeader from "./table/ApplicationTableHeader";
import ApplicationTableBody from "./table/ApplicationTableBody";
import ApplicationTableSkeleton from "./table/ApplicationTableSkeleton";
import { useManageApp } from "../context/ManageApplicationProvider";
// import RenderContent from "@/bik-lib/utils/RenderContent";

const ApplicationBody = ({ formData }: any) => {
  const { appList, reFetch, reFetching } = useManageApp();

  // Placeholder for loading state
  if (appList === undefined) {
    return (
      <div className="table-container flex flex-col text-sm w-full">
        <ApplicationTableHeader />
        <ApplicationTableSkeleton />
      </div>
    );
  }

  if (appList === null) {
    return (
      <div className="table-container flex flex-col text-sm w-full">
        <ApplicationTableHeader />
        <ul className="table-body flex flex-col w-full">
          <li className="group/row h-14.5 w-full text-primary-900 text-base flex items-center justify-between *:text-sm border-b border-b-primary-200 [&>div]:p-2 !cursor-default !bg-white">
            <div className="w-full">No Application Found</div>
          </li>
        </ul>
      </div>
    );
  }

  if (reFetching) {
    return (
      <div className="table-container flex flex-col text-sm w-full">
        <ApplicationTableHeader />
        <ApplicationTableSkeleton rows={appList} />
      </div>
    );
  }

  return (
    <div className="table-container flex flex-col text-sm w-full">
      <ApplicationTableHeader />
      <ApplicationTableBody formData={formData} data={appList} handleReload={reFetch} />
    </div>
  );
};

export default ApplicationBody;
