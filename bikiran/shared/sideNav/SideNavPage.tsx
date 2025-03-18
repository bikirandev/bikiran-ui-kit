"use client";
import { menuArray } from "@/bikiran/shared/sideNav/constant";
import Image from "next/image";
import React, { useState } from "react";
import { NavItem } from "./NavMenuTypes";
import SideNavSubMenu from "./SideNavSubMenu";
import Link from "next/link";

const SideNavPage = () => {
  const [activeNavId, setActiveNavId] = useState<string | null>(null);
  const [activeSubMenuId, setActiveSubMenuId] = useState<string | null>(null);

  // initially active nav and submenu
  // const [activeNavId, setActiveNavId] = useState(menuArray[0].id || null);
  // const [activeSubMenuId, setActiveSubMenuId] = useState(
  //   menuArray[0].subMenu ? menuArray[0].subMenu[0].id : null
  // );

  const handleNavClick = (id: string) => {
    setActiveNavId(activeNavId === id ? null : id);
    // when nav is active submenu is also active
    setActiveSubMenuId(activeSubMenuId === id ? null : id);
  };

  const handleSubMenuClick = (id: string) => {
    // setActiveSubMenuId(activeSubMenuId === id ? null : id);
    setActiveSubMenuId((prev) => {
      return prev === id ? null : id;
    });
  };

  return (
    <div className="w-[230px] fixed h-screen bg-[#07090B] text-primary-100  overflow-y-auto scrollbar-hidden">
      {/* side nav menu... */}

      {menuArray.map((item: NavItem) => (
        <ul key={item.id} className="px-2.5 pt-4">
          <Link href={item.id}>
            <li
              onClick={() => handleNavClick(item.id)}
              className={`relative z-10 group flex gap-2.5 p-2 cursor-pointer ${activeNavId === item.id ? "bg-slate-900" : ""}`}
            >
              <div className="flex gap-2.5 ">
                <div className=" w-[26px] ">
                  <Image
                    src={item.iconLine}
                    alt="alt"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto opacity-100 group-hover:opacity-0 transition-all duration-500"
                  />
                  <Image
                    src={item.iconFill}
                    alt="alt"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={`w-[26px] absolute top-2  ${activeNavId === item.id ? "opacity-100" : "opacity-0"} 
                  group-hover:opacity-100 transition-all duration-300`}
                  />
                </div>
                <h2>{item.title}</h2>
              </div>
            </li>
          </Link>

          {/* Submenu */}
          <SideNavSubMenu
            activeNavId={activeNavId}
            item={item}
            handleSubMenuClick={handleSubMenuClick}
            activeSubMenuId={activeSubMenuId}
          />
        </ul>
      ))}
    </div>
  );
};

export default SideNavPage;
