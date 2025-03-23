import { FC } from "react";
import { headerIcons } from "./icons/icons";
import Link from "next/link";
import Image from "next/image";
import FixedHeaderControl from "./FixedHeaderControl";
import HeaderLoginColumnComp from "./HeaderLoginColumnComp";

export const CompLogo: FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2 ">
      <div className="w-32">
        <Image
          src={headerIcons.iconBikLogo}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-full"
          priority
        />
      </div>
    </Link>
  );
};

interface HeaderSectionProps {
  onToggleMenu: () => void;
  className?: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({className, onToggleMenu })=> {
  return (
    <FixedHeaderControl>
      <header className={`header_container ${className} `} >
        <div className="flex h-full items-center justify-between ">
          <div className="flex items-center gap-3 h-full">
            {/* Toggle button only on mobile */}
            <button onClick={onToggleMenu} className="block md:hidden text-2xl">
              ☰
            </button>
            
            <CompLogo />
          </div>

          <div className="w-[200px] xl:w-[350px]">
            <HeaderLoginColumnComp />
          </div>
        </div>
      </header>
    </FixedHeaderControl>
  );
};

export default HeaderSection;
