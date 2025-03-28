"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { icons } from "@/bikiran/lib/icons";
import { cn } from "@/bik-lib/utils/cn";
import { useApp } from "@/bik-lib/context/AppProvider";
import Link from "next/link";
import ServicesPopup from "@/bik-lib/features/services-popup/ServicesPopup";

const HeaderServiceBtnComp = () => {
  const [show, setShow] = useState(false);
  const { authInfo } = useAuth2();
  const { applicationData } = useApp();

  const ref = useRef<HTMLButtonElement>(null);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <button
      type="button"
      ref={ref}
      className={cn(
        "w-full hover:bg-primary-100 rounded-full transition-colors relative lg:p-2.5 p-1.5",
        {
          "bg-primary-100": show,
        }
      )}
      onClick={() => handleShow()}
    >
      <Image
        src={icons.iconAllService}
        alt="all service"
        width={0}
        height={0}
        className="size-[18px] lg:size-auto"
      />

      {show && (
        <ServicesPopup
          auth={authInfo}
          apps={applicationData}
          setShow={setShow}
          ref={ref}
        />
      )}
    </button>
  );
};

export default HeaderServiceBtnComp;
