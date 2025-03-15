import { icons } from "@/bikiran/lib/icons";
import Image from "next/image";
import React from "react";
import { menuArray } from "./constant";

const UserPage = () => {
  return (
    <div className="w-[230px] h-screen bg-[#07090B] text-primary-100 ">
      {menuArray.map((item) => (
        <ul key={item.id} className="px-2.5 pt-4">
          <li className="relative group flex gap-2.5 p-2 ">
            <div className="w-[26px]">
              <Image
                src={item.iconLine}
                alt="alt"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto opacity-100 group-hover:opacity-0"
              />
              <Image
                src={item.iconFill}
                alt="alt"
                width={0}
                height={0}
                sizes="100vw"
                className="w-[26px] absolute top-2 opacity-0 group-hover:opacity-100"
              />
            </div>
            <h2>{item.title}</h2>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default UserPage;
