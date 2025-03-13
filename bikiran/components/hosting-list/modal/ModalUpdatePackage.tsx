import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent } from "@/bik-lib/types/event";
import { useHostingList } from "../context/HostingListProvider";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { packageData } from "./dummydata";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { cn } from "@/bik-lib/utils/cn";
import { Button } from "bik-button";
import { ApiUpdateHostingPackage } from "../HostingListOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { reload } = useHostingList();
  const { modalData, setMessage } = useTemplate();

  const { authInfo } = useAuth2();
  const [activePackage, setActivePackage] = useState<{
    id: number;
    disk: string;
    bandwidth: string;
    cpu: string;
    ram: string;
    price: number;
    offerPrice: number;
    currency: string;
    recommended: boolean;
    currentPackage: boolean;
  } | null>(null);

  const handleActive = (index: number) => {
    setActivePackage({
      ...packageData[index],
    });
  };
  const packageId = activePackage?.id ?? 0;

  const updateHostingPackage = () => {
    setLoading(true);
    setMessage("Updating...");
    setActivePackage(null);

    ApiUpdateHostingPackage(authInfo, modalData.id, packageId)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    updateHostingPackage();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="flex items-center gap-4">
        <Button variant="secondary">Web Hosting</Button>
        <Button variant="secondary-line">Email Hosting</Button>
        <Button variant="secondary-line">App Hosting</Button>
      </div>
      <table className="table-container ">
        <thead>
          <tr>
            <th className="w-[100px] !text-center">SL</th>
            <th className="w-[100px]">Disk</th>
            <th className="w-[100px]">BandWidth</th>
            <th className="w-[100px]">CPU</th>
            <th className="w-[100px]">RAM</th>
            <th className="w-[100px]">Price</th>
            <th className="w-[125px]"></th>
          </tr>
        </thead>
        <tbody>
          {packageData.map((item, index) => (
            <tr
              key={index}
              className={cn("hover:!bg-secondary-300", {
                "!bg-secondary-300": activePackage?.id === item.id,
              })}
              onClick={() => handleActive(index)}
            >
              <td className="text-center">{item.id}</td>
              <td className="text-center">{item.disk}</td>
              <td className="text-center">{item.bandwidth}</td>
              <td className="text-center">{item.cpu}</td>
              <td className="text-center">{item.ram}</td>
              <td className="text-center">
                <div className="flex flex-col justify-center items-center gap-0.5">
                  <span className="line-through text-primary-500 text-sm">
                    {showCurrencySign(item.currency)} {showInt(item.price)}
                  </span>
                  <span>
                    {showCurrencySign(item.currency)}
                    {showInt(item.offerPrice)}
                  </span>
                </div>
              </td>
              <td>
                {item.currentPackage && activePackage?.id !== item.id ? (
                  <div className="flex items-center justify-center">
                    <Image
                      alt="owned"
                      src={icons.iconTickHover}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="size-5"
                    />
                  </div>
                ) : null}
                {item.recommended && activePackage?.id !== item.id ? (
                  <div className="text-white bg-[#14B9FF] px-1 rounded-5">
                    Recommended
                  </div>
                ) : null}
                {activePackage?.id === item.id ? (
                  <div className="flex justify-center items-center text-primary text-base font-medium">
                    Selected
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full">
        {activePackage ? (
          <Button
            variant="secondary"
            className="grid grid-flow-col px-0 py-3 w-full"
            type="submit"
          >
            <div className="w-[100px]">{activePackage.id}</div>
            <div className="w-[100px]">{activePackage.disk}</div>
            <div className="w-[100px]">{activePackage.bandwidth}</div>
            <div className="w-[100px]">{activePackage.cpu}</div>
            <div className="w-[100px]">{activePackage.ram}</div>
            <div className="w-[100px]">
              {showCurrencySign(activePackage.currency)}
              {showInt(activePackage.offerPrice)}
            </div>
            <div className="w-[125px]">Next</div>
          </Button>
        ) : (
          <Button
            variant="gray"
            className="px-3 py-3 w-full"
            type="submit"
            loading={loading}
          >
            {"Next"}
          </Button>
        )}
      </div>
    </form>
  );
};
const ModalUpdatePackage: FC = () => {
  const { closeModal, modalType } = useTemplate();

  return (
    <Dialog open={modalType === "update-Package"} onOpenChange={closeModal}>
      <DialogContent
        aria-describedby={undefined}
        className="modal-container !max-w-fit"
      >
        <DialogHeader>
          <DialogTitle>Update Package</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1 ">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdatePackage;
