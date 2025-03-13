import React from "react";
import { Skeleton } from "../../ui/skeleton";

const GatewayTransactionSkeletonComp = ({ rows }: any) => {
  const rowsMapped = Array.isArray(rows)
    ? rows.map((row: any, i: number) => i)
    : [1, 2, 3, 4, 5, 6];

  return (
    <tbody>
      {rowsMapped.map((index: number) => (
        <tr key={index}>
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
          <td>
            <Skeleton className="size-8" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default GatewayTransactionSkeletonComp;
