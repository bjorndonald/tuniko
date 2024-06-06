import Link from "next/link";
import React from "react";
import { ArrowLeft } from "react-feather";

const UpdatesPage = () => {
  return (
    <main className="min-h-screen py-[65px]">
      <div className="mx-auto flex max-w-xl flex-col px-4">
        <div>
          <Link
            className="btn btn-ghost mb-1 flex w-fit gap-2 whitespace-nowrap text-sm"
            href={"/"}
          >
            <ArrowLeft size={14} />
            BACK
          </Link>
        </div>
        <h2 className="mb-12 text-4xl font-extrabold tracking-tight">
          Tuniko Updates
        </h2>

        <h4 className="mb-4 text-xl font-bold">
          🚀 Tuniko is born • June 20th, 2024
        </h4>
        <div>
          After 2 months of development, the community translator is finally
          ready!
        </div>
        <ul className="ml-4">
          <li>- Create and translate corpus texts </li>
          <li>- Track your ability to translate</li>
          <li>- Grow a a database of digital unknown languages</li>
        </ul>
      </div>
    </main>
  );
};

export default UpdatesPage;
