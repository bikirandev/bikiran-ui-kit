import React from "react";
import { Skeleton } from "../../ui/skeleton";

const AccountAdmSkeletonComp = ({ rows }: any) => {
  const rowsMapped = rows?.map((row: any, i: number) => i) || [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ];

  return (
    <tbody>
      {rowsMapped.map((index: any) => (
        <tr key={index} className="h-16">
          <td>
            <Skeleton className="h-5" />
          </td>
          <td>
            <div className="flex justify-center items-center">
              <Skeleton className="size-10 rounded-full" />
            </div>
          </td>
          <td>
            <Skeleton className="h-5" />
          </td>
          {/* <td>
            <Skeleton className="h-5" />
          </td> */}
          {/* <td>
            <Skeleton className="h-5" />
          </td> */}
          {/* <td>
            <Skeleton className="h-5" />
          </td> */}
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

export default AccountAdmSkeletonComp;
