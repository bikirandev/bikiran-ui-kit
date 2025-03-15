"use client";
import Image from "next/image";
import React, { useState } from "react";
import { menuArray } from "./constant";

const UserPage = () => {
  // const [active, setActive] = useState(false);

  // const handlePricingDetails = () => {
  //   setActive((prev) => !prev);
  // };

  const [activeNavId, setActiveNavId] = useState<number | null>(null);

  const handleNavClick = (id: number) => {
    // Toggle submenu: if the same nav is clicked again, close it
    setActiveNavId(activeNavId === id ? null : id);
  };

  return (
    <div className="w-[230px] h-screen bg-[#07090B] text-primary-100 ">
      {menuArray.map((item) => (
        <ul key={item.id} className="px-2.5 pt-4">
          <li
            onClick={() => handleNavClick(item.id)}
            className="relative group flex gap-2.5 p-2 cursor-pointer"
          >
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

          {/* Submenu */}

          {activeNavId === item.id && item.subMenu && (
            <ul
              className={`pl-8 mt-2 space-y-1 submenu ${activeNavId === item.id ? "open" : ""}`}
            >
              {item.subMenu?.map((subItem, index) => (
                <li
                  key={index}
                  className="p-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                >
                  {subItem.title}
                </li>
              ))}
            </ul>
          )}
        </ul>
      ))}
    </div>
  );
};

export default UserPage;
