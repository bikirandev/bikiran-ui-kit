import { FC } from "react";
import { headerIcons } from "./icons/icons";
import Link from "next/link";
import Image from "next/image";
import FixedHeaderControl from "./FixedHeaderControl";
import HeaderLoginColumnComp from "./HeaderLoginColumnComp";
import SearchBar from "@/bik-lib/features/search/SearchBar";

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

const HeaderSection: React.FC<HeaderSectionProps> = ({
  className,
  onToggleMenu,
}) => {
  return (
    <FixedHeaderControl>
      <header className={`header_container ${className} `}>
        <div className="flex h-full justify-between items-center">
          <div className="md:hidden block">
            {/* Toggle button only on mobile */}
            <button onClick={onToggleMenu} className="block md:hidden text-2xl">
              ☰
            </button>
          </div>

          <div>
            <SearchBar
              onChange={() => {}}
              value=""
              className="bg-black border border-[#ffff]/20 w-[220px] md:w-[500px] ml-3 md:ml-12 h-10"
              placeholder="Search Anything..."
            />
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
