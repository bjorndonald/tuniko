import React from "react";
import { Logo } from "../../Shared/Icons";
import Link from "next/link";
import { auth } from "@/auth";
import ThemeToggle from "./ThemeToggle";
import ProfileMenu from "./ProfileMenu";
import DownloadButton from "./DownloadButton";
import UserScore from "./UserScore";

const Header = async () => {
  const session = await auth();
  return (
    <header className="bg-background absolute left-0 top-0  w-screen border-b border-base-300 py-2 pl-2 pr-4 ">
      <div className="flex h-12 items-center justify-between">
        <div className=" flex grow items-center pr-[30px]">
          <Link href={"/"} className=" btn btn-ghost flex items-center gap-1">
            <Logo width={30} />
            <span className="hidden text-[22px]/[24px] accent-accent tablet-md:block">
              Tuniko
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <DownloadButton />
          {!!session?.user && <UserScore session={session} />}

          <ThemeToggle />

          {!!session?.user && <ProfileMenu session={session} />}
          {!session?.user && (
            <>
              <Link
                href={"/signin"}
                className="btn btn-ghost ml-2 hidden text-primary tablet-md:block"
              >
                LOGIN TO TRACK PROGRESS
              </Link>
              <Link
                href={"/signin"}
                className="btn btn-ghost ml-2 text-primary tablet-md:hidden"
              >
                LOGIN
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
