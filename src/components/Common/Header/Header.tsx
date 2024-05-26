import React from "react";
import { Logo } from "../../Shared/Icons";
import Image from "next/image";
import { Session } from "next-auth";
import Link from "next/link";
import { Download } from "react-feather";

interface Props {
  session: Session;
}

const Header = ({ session }: Props) => {
  return (
    <header className="absolute left-0 top-0 w-[calc(100vw-24px)] border-b border-b-black/[0.12] bg-white py-2 pl-2 pr-4 ">
      <div className="flex h-12 items-center justify-between">
        <div className=" flex grow items-center pr-[30px]">
          <Link href={"/"} className=" btn btn-ghost flex items-center gap-1">
            <Logo width={30} />
            <span className="text-[22px]/[24px]  text-tertiary">Tuniko</span>
          </Link>
        </div>

        <div className="flex items-center">
          <button className="btn btn-outline btn-primary mr-2 flex !border-primary !text-primary hover:!bg-primary hover:!text-white">
            <Download width={20} />
            Download CSV
          </button>

          <div className="ml-4 flex items-center gap-2">
            <progress
              className="progress progress-primary w-28"
              value={40}
              max="100"
            ></progress>
            <span className="text-sm font-semibold text-primary">1.4</span>
          </div>

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
