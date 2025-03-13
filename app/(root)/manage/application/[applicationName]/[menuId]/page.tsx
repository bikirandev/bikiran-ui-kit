import ManageDocsContentPage from "@/bikiran/components/manage-docs-content/ManageDocsContentPage";
import React, { FC } from "react";

interface Params {
  applicationName: string;
  menuId: string;
}

const page: FC<{ params: Params }> = ({ params }) => {
  return <ManageDocsContentPage params={params} />;
};

export default page;
