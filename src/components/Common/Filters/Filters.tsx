"use client";
import React, { useState } from "react";
import TextIcon from "./Text.icon";
import Logo from "../../Shared/Icons/Logo";
import { FileText, Plus, X } from "react-feather";
import Icon from "@mdi/react";
import { mdiSwapHorizontal } from "@mdi/js";
import useCorpus from "@/store/corpus";
import NextLink from "next/link";
import { SortType } from "@/types/options";
import { useSearchParams } from "next/navigation";
import Link from "@/components/Shared/Link";
import $ from "jquery";

type TextType = "All" | "Text" | "Document";
type Language = "Efik" | "English";

const Filters = () => {
  const searchParams = useSearchParams();
  const sortType = searchParams.get("sort_type");
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  const [textType, setTextType] = useState<TextType>("All");
  const [sort, setSort] = useState<SortType>(sortType as SortType);
  const [searchTerm, setSearchTerm] = useState("");
  const [from, setFrom] = useState<Language>();
  const [to, setTo] = useState<Language>();
  const selected = useCorpus(s => s.selected);
  const resetSelections = useCorpus(s => s.resetSelections);

  const closeMenu = () => {
    $(".dropdown").removeClass("dropdown-open");
    const active = document.activeElement as HTMLElement;
    active.blur();
  };

  return (
    <div className="flex  h-fit flex-col-reverse justify-between pt-3 desktop:h-[68px] desktop:flex-row desktop:items-center ">
      <div className="flex items-center gap-2">
        <div className="dropdown tablet-md:hidden">
          <div
            tabIndex={0}
            role="button"
            className="rounded btn btn-outline m-1 h-9 min-h-9 border-[rgb(218,220,224)] font-normal text-[rgb(25,103,210)] hover:bg-primary/10"
          >
            {textType}
          </div>
          <ul
            tabIndex={0}
            className="rounded menu dropdown-content  z-[1] w-52 border border-[rgb(218,220,224)] bg-white/65 p-2 text-tertiary shadow"
          >
            <li onClick={() => setTextType("All")}>
              <a className="flex gap-1">
                <Logo width={20} />
                All
              </a>
            </li>
            <li onClick={() => setTextType("Text")}>
              <a className="flex gap-1">
                <TextIcon />
                Text
              </a>
            </li>
            <li onClick={() => setTextType("Document")}>
              <a className="flex gap-1">
                <FileText width={20} color={"rgb(25,103,210)"} />
                Document
              </a>
            </li>
          </ul>
        </div>
        <button
          onClick={() => setTextType("All")}
          className={`hidden h-9 items-center gap-1.5 border border-divider pl-[11px] pr-[15px] transition hover:bg-primary/10 tablet-md:flex ${textType === "All" ? "!bg-primary/10" : ""} rounded cursor-pointer`}
        >
          <Logo width={20} />
          <span className="text-sm text-accent">All</span>
        </button>
        <button
          onClick={() => setTextType("Text")}
          className={`hidden h-9 items-center gap-1.5 border border-divider pl-[11px] pr-[15px] transition hover:bg-primary/10 tablet-md:flex ${textType === "Text" ? "!bg-primary/10" : ""} rounded cursor-pointer`}
        >
          <TextIcon />
          <span className="text-sm text-accent">Text</span>
        </button>
        <button
          onClick={() => setTextType("Document")}
          className={`hidden h-9 items-center gap-1.5 border border-divider pl-[11px] pr-[15px] transition hover:bg-primary/10 tablet-md:flex ${textType === "Document" ? "!bg-primary/10" : ""} rounded cursor-pointer`}
        >
          <FileText width={20} color={"rgb(25,103,210)"} />
          <span className="text-sm text-accent">Document</span>
        </button>

        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="rounded btn btn-outline m-1 h-9 min-h-9 border-divider font-normal text-accent hover:bg-primary/10"
          >
            {from || "All"}
          </div>
          <ul
            tabIndex={0}
            className="rounded menu dropdown-content  z-[1] w-52 border border-divider bg-background p-2 text-tertiary-txt shadow"
          >
            <li onClick={() => setFrom("English")}>
              <a>English</a>
            </li>
            <li onClick={() => setFrom("Efik")}>
              <a>Efik</a>
            </li>
          </ul>
        </div>

        <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-black/10 tablet-md:mx-1">
          <Icon path={mdiSwapHorizontal} size={24} />
        </button>

        <div
          className={`dropdown ${from ? "" : "pointer-events-none opacity-30"}`}
        >
          <div
            tabIndex={0}
            role="button"
            className="rounded btn btn-outline m-1 h-9 min-h-9 border-divider font-normal text-accent hover:bg-primary/10"
          >
            {to || "All"}
          </div>
          <ul
            tabIndex={0}
            className="rounded menu dropdown-content  z-[1] w-52 border border-divider bg-background p-2 text-tertiary-txt shadow"
          >
            <li onClick={() => setTo("English")}>
              <a>English</a>
            </li>
            <li onClick={() => setTo("Efik")}>
              <a>Efik</a>
            </li>
          </ul>
        </div>

        {!!selected.length && (
          <div
            onClick={() => {
              alert("collection");
            }}
            className="btn btn-primary flex h-9 min-h-9 gap-2 bg-primary px-3 text-white "
          >
            Make {selected.length} into collection
            <button
              onClick={e => {
                resetSelections();
                e.stopPropagation();
              }}
              className="btn btn-circle btn-ghost h-fit min-h-fit w-fit p-0.5"
            >
              <X size={16} color="white" />
            </button>
          </div>
        )}
        <NextLink
          href={"/request"}
          className="btn btn-outline btn-primary mr-2 flex h-9 min-h-9 rounded-1 !border-primary !text-primary hover:!bg-primary hover:!text-white"
        >
          <Plus width={20} />
          Request
        </NextLink>
      </div>

      <div className="flex items-center gap-2">
        <label className="rounded input flex h-9 items-center gap-2 border-divider bg-transparent !outline-none">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="grow text-primary placeholder:text-primary/70"
            placeholder="Search"
          />
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
                href={`/?sort_by=Popular&page=${page}`}
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
                href={`/?sort_by=Recent&page=${page}`}
              >
                Recent
              </Link>
            </li>
            <li
              onClick={() => {
                setSort("Easiest");
                closeMenu();
              }}
            >
              <Link
                title="Easiest entries"
                href={`/?sort_by=Easiest&page=${page}`}
              >
                Easiest
              </Link>
            </li>
            <li
              onClick={() => {
                setSort("Hardest");
                closeMenu();
              }}
            >
              <Link
                title="Hardest entries"
                href={`/?sort_by=Hardest&page=${page}`}
              >
                Hardest
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filters;
