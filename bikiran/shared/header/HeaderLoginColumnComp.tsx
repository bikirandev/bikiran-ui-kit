"use client";
import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import HeaderServiceBtnComp from "./HeaderServiceBtnComp";
import HeaderMenuNotificationComp from "./HeaderMenuNotificationComp";
import { ProfileManage } from "bik-utils";
import AuthCompWrapper from "@/bik-lib/context/auth/AuthCompWrapper";
import Image from "next/image";
import Link from "next/link";

const HeaderLoginColumnComp: FC = ({}) => {
  return (
    <ul className="flex items-center justify-end gap-3.5 lg:gap-4">
      <li>
        <HeaderMenuNotificationComp />
      </li>
      {/* {pathname !== "/cart" ? (
        <li className="flex -mx-1">
          <CartMenu cartData={cartItems} removeProduct={removeItem} />
        </li>
      ) : null} */}
      <li className="-mx-1">
        <HeaderServiceBtnComp />
      </li>
      {/* <li>
        <ProfileManage
          authFn={useAuth2}
          AuthCompWrapper={AuthCompWrapper}
          ImageComponent={Image}
          LinkComponent={Link}
        />
      </li> */}
    </ul>
  );
};

export default HeaderLoginColumnComp;
