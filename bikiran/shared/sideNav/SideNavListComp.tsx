"use client";
import { menuArray } from "@/bikiran/shared/sideNav/constant";
import Image from "next/image";
import React, { useState } from "react";
import { NavItem } from "./NavMenuTypes";

const SideNavListComp = () => {
  const [activeNavId, setActiveNavId] = useState<number | null>(null);

  const handleNavClick = (id: number) => {
    setActiveNavId(activeNavId === id ? null : id);
  };

  return (
    <div className="w-[230px] h-screen bg-[#07090B] text-primary-100 ">
      {/* side nav menu... */}

      {menuArray.map((item: NavItem) => (
        <ul key={item.id} className="px-2.5 pt-4">
          <li
            onClick={() => handleNavClick(item.id)}
            className={`relative group flex gap-2.5 p-2 cursor-pointer ${activeNavId === item.id ? "bg-slate-900" : ""}`}
          >
            <div className="flex gap-2.5 ">
              <div className=" w-[26px]">
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
            </div>
          </li>

          {/* Submenu */}
          {activeNavId === item.id && item.subMenu && (
            <ul className="mt-2 transition-all duration-500 ml-5 border-0">
              {item.subMenu?.map((subItem: any, index: any) => (
                <li
                  key={index}
                  className="relative group cursor-pointer pl-[18px] text-gray-300"
                >
                  <div className="absolute left-0 -top-[26px] h-full w-[1px] bg-gray-400" />
                  <svg
                    className="absolute left-0 top-[35%] -translate-y-1/2"
                    width="20"
                    height="20"
                    viewBox="0 0 28 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0 Q0 20 20 20 H28"
                      stroke="#ccc"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>

                  <div className="flex gap-1.5 hover:bg-red-800 p-2 rounded">
                    <div className="w-[20px]">
                      <Image
                        src={subItem.iconL}
                        alt="alt"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto opacity-100 group-hover:opacity-0"
                      />
                      <Image
                        src={subItem.iconF}
                        alt="alt"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-[20px] absolute top-2 opacity-0 group-hover:opacity-100"
                      />
                    </div>

                    {subItem.title}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ul>
      ))}
    </div>
  );
};

export default SideNavListComp;
