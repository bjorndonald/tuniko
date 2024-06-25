import Link from "next/link";
import React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen pb-10 pt-20">
      <div className="mb-8 flex flex-col items-center">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight">
          Settings 🧰
        </h2>
        <p className="text-base opacity-80">
          Update your profile and set up your notifications
        </p>
      </div>
      <div className="bg-primary/4 md:mb-12 card mx-auto  mb-8 grid max-w-4xl border border-base-300 bg-base-100 ">
        <aside className="min-h-full w-56">
          <ul className="menu w-full">
            <li className="px-4 py-2 text-sm font-bold uppercase text-base-300">
              Navigation
            </li>
            <li>
              <Link href={"/settings/profile"}>Profile</Link>
            </li>
            <li>
              <Link href={"/settings/notifications"}>Notifications</Link>
            </li>
          </ul>
        </aside>
        <div className="col-start-2 row-start-1 min-w-0">{children}</div>
      </div>
    </main>
  );
}
