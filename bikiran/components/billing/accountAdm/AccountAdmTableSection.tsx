import React, { FC } from "react";
import { useAccountAdmContext } from "./context/AccountAdmProvider";
import AccountAdmTableHeaderComp from "./AccountAdmTableHeaderComp";
import AccountAdmTableBodyComp from "./AccountAdmTableBodyComp";
import AccountAdmSkeletonComp from "./AccountAdmSkeletonComp";

const AccountAdmTableSection: FC<{ data: any }> = ({ data }) => {
  const { reFetching } = useAccountAdmContext();

  if (data === undefined) {
    return (
      <div className="flex flex-col gap-3">
        <table className="table-container">
          <AccountAdmTableHeaderComp />
          <AccountAdmSkeletonComp row={data} />
        </table>
      </div>
    );
  }

  if (data === null) {
    return (
      <div className="flex flex-col gap-3">
        <table className="table-container">
          <AccountAdmTableHeaderComp />
          <tbody>
            <tr>
              <td
                colSpan={9}
                className="text-center text-primary font-medium h-40"
              >
                No Account Found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (reFetching) {
    return (
      <div className="flex flex-col gap-3">
        <table className="table-container">
          <AccountAdmTableHeaderComp />
          <AccountAdmSkeletonComp rows={data} />
        </table>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      <table className="table-container">
        <AccountAdmTableHeaderComp />
        <AccountAdmTableBodyComp data={data} />
      </table>
    </div>
  );
};

export default AccountAdmTableSection;
