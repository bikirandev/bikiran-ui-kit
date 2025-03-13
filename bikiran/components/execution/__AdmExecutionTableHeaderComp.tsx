import React from "react";
import { TableHeader, TableRow, TableHead } from "../ui/table";

const AdmExecutionTableHeaderComp = () => {
  return (
    <TableHeader className="bg-primary-100 hover:!bg-primary-100 ">
      {/* <TableRow className="!border-0">
        <TableHead className="w-[150px] rounded-tl-8 rounded-bl-8">
          Invoice Id
        </TableHead>
        <TableHead className="w-[175px]">Reference Id</TableHead>
        <TableHead className="w-[175px]">Reference Key</TableHead>
        <TableHead className="w-[200px]">Domain</TableHead>
        <TableHead className="w-[175px] !text-center">TimeSuccess</TableHead>
        <TableHead className="w-[175px] !text-center">Status</TableHead>
        <TableHead className="w-[175px]">TimeCreated</TableHead>
        <TableHead className="w-[175px] text-center rounded-tr-8 rounded-br-8">
          Action
        </TableHead>
      </TableRow> */}
    </TableHeader>
  );
};

export default AdmExecutionTableHeaderComp;
