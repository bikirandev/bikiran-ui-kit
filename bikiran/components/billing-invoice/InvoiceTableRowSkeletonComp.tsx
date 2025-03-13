import React from "react";
import { Skeleton } from "../ui/skeleton";

const InvoiceTableRowSkeletonComp = () => {
  return (
    <tr>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="size-10 rounded-full" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
    </tr>
  );
};

export default InvoiceTableRowSkeletonComp;
