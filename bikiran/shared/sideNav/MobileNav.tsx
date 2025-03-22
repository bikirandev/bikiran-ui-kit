import { cn } from "@/bik-lib/utils/cn";
import React, { useEffect, useRef } from "react";
import SideNavMenu from "./SideNavMenu";

const MobileNav = ({ isMenuOpen, handleClose }: any) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  const onMenuClick = () => {
    handleClose();
  };
  return (
    <div
      className={cn("sidebar_menu_wrapper", {
        active: isMenuOpen,
      })}
    >
      <div ref={menuRef}>
        <SideNavMenu onMenuClick={onMenuClick} handleClose={handleClose}/>
      </div>
    </div>
  );
};

export default MobileNav;
