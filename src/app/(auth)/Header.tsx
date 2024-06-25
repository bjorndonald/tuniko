import Logo from "@/components/Shared/Logo";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-background absolute left-0 top-0  w-screen border-b border-base-300 py-2 pl-2 pr-4 ">
      <div className="flex h-12 items-center justify-between">
        <div className=" flex grow items-center pr-[30px]">
          <Link href={"/"} className=" btn btn-ghost flex items-center gap-1">
            <Logo width={30} />
            <span className=" text-[22px]/[24px] accent-accent ">Tuniko</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
