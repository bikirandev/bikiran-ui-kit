"use client";
import React, { useState } from "react";
import SideNavMenu from "./SideNavMenu";
import HeaderSection from "../header/HeaderSection";
import MobileNav from "./MobileNav";

const SideNavComp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      {/* Side Navigation Menu */}
      <div className="md:block hidden">
        <SideNavMenu handleClose={handleClose}/>
      </div>
      <div>
        <MobileNav isMenuOpen={isMenuOpen} handleClose={handleClose} />
      </div>

      <div className="md:ml-[230px]">
        <HeaderSection onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      </div>
    </div>
  );
};

export default SideNavComp;
