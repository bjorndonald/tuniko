import React from "react";
import { Logo } from "../../Shared/Icons";
import Image from "next/image";
import { Session } from "next-auth";
import Link from "next/link";
import { Download } from "react-feather";
import { auth } from "@/auth";
import ThemeToggle from "./ThemeToggle";

const Header = async () => {
  const session = await auth();
  return (
    <header className="absolute w-screen left-0 top-0  border-b border-divider bg-background py-2 pl-2 pr-4 ">
      <div className="flex h-12 items-center justify-between">
        <div className=" flex grow items-center pr-[30px]">
          <Link href={"/"} className=" btn btn-ghost flex items-center gap-1">
            <Logo width={30} />
            <span className="tablet-md:block hidden text-[22px]/[24px] accent-accent">Tuniko</span>
          </Link>
        </div>

        <div className="flex gap-3 items-center">
          <button className="btn btn-outline btn-primary mr-2 flex !border-primary !text-primary hover:!bg-primary hover:!text-white">
            <Download width={20} />
            <span className="hidden tablet-md:block">Download</span> CSV
          </button>

          <div className="tablet-md:ml-4 flex items-center gap-2">
            <progress
              className="hidden tablet-md:block progress bg-progress progress-primary w-28"
              value={40}
              max="100"
            ></progress>
            <span className="text-sm font-semibold text-primary">1.4</span>
          </div>

          <ThemeToggle />

          {!!session?.user && (
            <>
              <div className="btn btn-ghost rounded-full p-1">
                <Image
                  className="rounded-full"
                  width={32}
                  height={32}
                  src={session.user.image}
                  alt={`${session.user.name}`}
                />
              </div>
            </>
          )}
          {!session?.user && (
            <Link href={"/signin"} className="btn btn-ghost ml-2 text-primary">
              LOGIN TO TRACK PROGRESS
            </Link>
          )}

          

          
        </div>
      </div>
    </header>
  );
};

export default Header;
