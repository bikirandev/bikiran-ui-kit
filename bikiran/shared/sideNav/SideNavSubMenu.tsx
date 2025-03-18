import Image from "next/image";
import React, { useState } from "react";

const SideNavSubMenu = ({
  activeNavId,
  item,
  activeSubMenuId,
  handleSubMenuClick,
}: any) => {
  return (
    <div
      className={`overflow-hidden  ${
        activeNavId === item.id
          ? "max-h-[1000px] opacity-100 transition-all duration-700"
          : "max-h-0 opacity-0 transition-all duration-700"
      }`}
    >
      <ul className="mt-2 ml-5 border-0">
        {item.subMenu?.map((subItem: any, index: any) => (
          <li
            key={index}
            onClick={() => handleSubMenuClick(subItem.id)}
            className="relative group cursor-pointer pl-[17px] text-gray-300"
          >
            <div className="absolute left-0 -top-[26px] h-full w-[1px] bg-gray-400" />

            <svg
              className="absolute left-0 top-[36%] -translate-y-1/2"
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

            <div
              className={`relative z-10 flex gap-1.5 items-center ${activeSubMenuId === subItem.id ? "bg-slate-800" : ""}
               hover:bg-slate-800 p-2 rounded `}
            >
              <Image
                src={subItem.iconL}
                alt="alt"
                width={0}
                height={0}
                sizes="100vw"
                className="w-[20px] h-auto opacity-100 group-hover:opacity-0 transition-all duration-300"
              />
              <Image
                src={subItem.iconF}
                alt="alt"
                width={0}
                height={0}
                sizes="100vw"
                className={`w-[20px] absolute top-2.5  ${activeSubMenuId === subItem.id ? "opacity-100" : "opacity-0"}
                 group-hover:opacity-100 transition-all duration-300`}
              />

              <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                {subItem.title}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavSubMenu;
