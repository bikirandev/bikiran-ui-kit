import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { icons } from "@/bikiran/lib/icons";
import UserSkeletonComp from "@/bikiran/shared/user-search/UserSkeletonComp";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";
import { GetTime } from "@/bik-lib/utils/date";

const InvoiceActivitiesComp: FC = () => {
  const { invoiceOwner, activities, loading } = useInvoiceInfo();

  return (
    <div className="invoice-action-cont">
      <div className="flex flex-col justify-between items-start overflow-y-auto">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-primary text-xl font-medium">Activities</h2>
          <button
            type="button"
            className="text-primary-500 text-sm font-medium hover:border-b hover:text-primary"
          >
            View All
          </button>
        </div>

        {loading && <UserSkeletonComp />}
        {!loading &&
          activities?.slice(0, 6)?.map((item) => (
            <div
              className="flex items-start gap-[14px] py-3 px-3 w-full"
              key={item.id}
            >
              <div className="size-9 flex-shrink-0 mt-1">
                <Avatar className="relative !size-full mb-3 group">
                  <AvatarImage
                    src={invoiceOwner?.photoUrl || icons.iconBikLogo}
                  />
                  <AvatarFallback className="uppercase bg-secondary-300">
                    X
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex flex-col overflow-hidden">
                <div className="text-sm text-primary overflow-hidden">
                  <p className="font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                    {item.description}
                  </p>
                  {/* <small className=""> {item.description}</small> */}
                </div>
                <div className="text-primary-700 text-sm font-normal">
                  {GetTime(item.timeCreated)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default InvoiceActivitiesComp;
