import React, { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const UserPropertiesSkeleton: FC = () => {
  return (
    <tr className="h-[60px] [&>th]:text-left  [&>tr]:pl-2">
      <td>
        <Skeleton className=" h-5" />
      </td>
      <td>
        <div className=" flex items-center gap-2">
          <Skeleton className="size-9 rounded-full" />
          <div>
            <Skeleton className="w-40 h-5" />
            <Skeleton className="w-40 h-5 mt-1" />
          </div>
        </div>
      </td>
      <td>
        <Skeleton className=" h-5" />
      </td>
      <td>
        <Skeleton className=" h-5" />
      </td>
      <td>
        <Skeleton className=" h-5" />
      </td>
      <td>
        <Skeleton className=" h-5" />
      </td>
      <td>
        <Skeleton className="w-8 h-8 float-right" />
      </td>
    </tr>
  );
};
export default UserPropertiesSkeleton;
