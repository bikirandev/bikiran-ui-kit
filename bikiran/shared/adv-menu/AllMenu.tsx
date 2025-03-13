import { icons } from "@/bikiran/lib/icons";
import { TLink } from "./AdvMenuTypes";
import { FC, useRef } from "react";
import Image from "next/image";
import { useAdvMenu } from "./AdvMenuProvider";

const menu: TLink = {
  id: "/all",
  miniTitle: "All",
  title: "All",
  iconFill: icons.iconSidebarAllFill,
  iconLine: icons.iconSidebarAll,
  subMenu: [],
};

const AllMenu: FC<{
  show: boolean;
  onClick: () => void;
}> = ({ show, onClick }) => {
  const { activeMenu } = useAdvMenu();

  const { id, title, miniTitle, iconFill, iconLine, subMenu } = menu;
  const ref = useRef(null);
  const path = subMenu?.length ? subMenu[0]?.id : id;

  return (
    <li className={`${!activeMenu.show || show ? "active" : ""}`} ref={ref}>
      <button type="button" className="menu" onClick={onClick}>
        <div title={title}>
          <Image
            src={iconFill}
            alt="alt"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
          <Image
            src={iconLine}
            alt="alt"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <span className="text-uppercase">{miniTitle}</span>
      </button>
      {/* <AdvLabel2 menu={menu} /> */}
    </li>
  );
};

export default AllMenu;
