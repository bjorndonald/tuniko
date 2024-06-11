import Logo from "@/components/Shared/Logo";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="absolute left-0 top-0 w-screen  border-b border-divider bg-background py-2 pl-2 pr-4 ">
      <div className="flex h-12 items-center justify-between">
        <div className=" flex grow items-center pr-[30px]">
          <Link href={"/"} className=" btn btn-ghost flex items-center gap-1">
            <Logo width={30} />
            <span className="hidden text-[22px]/[24px] accent-accent tablet-md:block">
              Tuniko
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
