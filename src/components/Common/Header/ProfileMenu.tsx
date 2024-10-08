import { Session } from "next-auth";
import { signOut } from "@/auth";
import Image from "next/image";
import React from "react";
import Link from "next/link";

interface Props {
  session: Session;
}

const ProfileMenu = ({ session }: Props) => {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
      className="dropdown dropdown-end"
    >
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost rounded-full p-1"
      >
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={session.user.image}
          alt={`${session.user.name}`}
        />
      </div>
      <ul
        tabIndex={0}
        className="bg-background menu dropdown-content z-[1] w-52 rounded-box border border-base-300 p-2 shadow"
      >
        <li>
          <Link className="w-full cursor-pointer" href={"/settings"}>
            Settings
          </Link>
        </li>
        <li>
          <button className="w-full cursor-pointer">Log out</button>
        </li>
      </ul>
    </form>
  );
};

export default ProfileMenu;
