"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import $ from "jquery";
import Link from "@/components/Shared/Link";
type SortType = "Popular" | "Recent" | "Easiest" | "Hardest";

const TranslationFilters = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const sortType = searchParams.get("sort_type");
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  const [searchTerm, setSearchTerm] = useState(search ?? "");
  const [sort, setSort] = useState<SortType>(sortType as SortType);

  const closeMenu = () => {
    $(".dropdown").removeClass("dropdown-open");
    const active = document.activeElement as HTMLElement;
    active.blur();
  };

  return (
    <div className="mx-auto mb-4 mt-24 flex flex-col items-center justify-between gap-3 px-4 tablet-md:mb-0 tablet-md:h-[68px] tablet-md:max-w-2xl tablet-md:flex-row">
      <h2 className="text-3xl">Translations</h2>

      <div className="flex items-center gap-2">
        <label className="rounded input flex h-9 items-center gap-2 border-divider bg-transparent !outline-none">
          <input
            type="text"
            value={searchTerm}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                navigate.push(
                  `?sort_by=${sortType}&page=${page}&search=${searchTerm}`,
                );
              }
            }}
            onChange={e => setSearchTerm(e.target.value)}
            className="grow text-primary placeholder:text-primary/70"
            placeholder="Search"
          />
          <Link
            title="Search results"
            href={`?sort_by=Popular&page=${page}&search=${searchTerm}`}
            className="btn btn-circle btn-ghost btn-sm flex items-center justify-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </label>

        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="rounded btn btn-outline m-1 h-9 min-h-9 border-divider font-normal text-primary hover:bg-primary/10"
          >
            {sort ?? "Sort By"}
          </div>
          <ul
            tabIndex={0}
            className="rounded menu dropdown-content  z-[1] w-52 border border-divider bg-background p-2 text-tertiary-txt shadow"
          >
            <li
              onClick={() => {
                setSort("Popular");
                closeMenu();
              }}
            >
              <Link
                title="Popular entries"
                openInNewTab={false}
                href={`?sort_by=Popular&page=${page}&search=${searchTerm}`}
              >
                Popular
              </Link>
            </li>
            <li
              onClick={() => {
                setSort("Recent");
                closeMenu();
              }}
            >
              <Link
                title="Recent entries"
                openInNewTab={false}
                href={`?sort_by=Recent&page=${page}&search=${searchTerm}`}
              >
                Recent
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TranslationFilters;
