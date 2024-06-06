import { Session } from "next-auth";
import { signOut } from "@/auth";
import Image from "next/image";
import React from "react";

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
        className="menu dropdown-content z-[1] w-52 rounded-box border border-divider bg-background p-2 shadow"
      >
        <li>
          <a className="cursor-pointer">
            <button>Log out</button>
          </a>
        </li>
      </ul>
    </form>
  );
};

export default ProfileMenu;
