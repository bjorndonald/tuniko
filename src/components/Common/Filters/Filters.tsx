"use client";
import React, { useState } from "react";
import TextIcon from "./Text.icon";
import Logo from "../../Shared/Icons/Logo";
import { FileText, Plus, X } from "react-feather";
import Icon from "@mdi/react";
import { mdiSwapHorizontal } from "@mdi/js";
import useCorpus from "@/store/corpus";
import Link from "next/link";

type TextType = "All" | "Text" | "Document";
type SortType = "Popular" | "Recent" | "Easiest" | "Hardest";
type Language = "Efik" | "English";

const Filters = () => {
  const [textType, setTextType] = useState<TextType>("All");
  const [sort, setSort] = useState<SortType>();
  const [searchTerm, setSearchTerm] = useState("");
  const [from, setFrom] = useState<Language>();
  const [to, setTo] = useState<Language>();
  const selected = useCorpus(s => s.selected);
  const resetSelections = useCorpus(s => s.resetSelections);

  return (
    <div className="flex-col-reverse  desktop:flex-row h-fit pt-3 flex desktop:h-[68px] desktop:items-center justify-between ">
      <div className="flex items-center gap-2">
        <div className="tablet-md:hidden dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-outline m-1 h-9 min-h-9 rounded border-[rgb(218,220,224)] font-normal text-[rgb(25,103,210)] hover:bg-primary/10"
          >
            {textType}
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1]  w-52 rounded border border-[rgb(218,220,224)] bg-white/65 p-2 text-tertiary shadow"
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
          className={`hidden tablet-md:flex h-9 items-center gap-1.5 border border-[rgb(218,220,224)] pl-[11px] pr-[15px] transition hover:bg-primary/10 ${textType === "All" ? "!bg-primary/10" : ""} cursor-pointer rounded`}
        >
          <Logo width={20} />
          <span className="text-sm text-accent">All</span>
        </button>
        <button
          onClick={() => setTextType("Text")}
          className={`hidden tablet-md:flex h-9 items-center gap-1.5 border border-[rgb(218,220,224)] pl-[11px] pr-[15px] transition hover:bg-primary/10 ${textType === "Text" ? "!bg-primary/10" : ""} cursor-pointer rounded`}
        >
          <TextIcon />
          <span className="text-sm text-accent">Text</span>
        </button>
        <button
          onClick={() => setTextType("Document")}
          className={`hidden tablet-md:flex h-9 items-center gap-1.5 border border-[rgb(218,220,224)] pl-[11px] pr-[15px] transition hover:bg-primary/10 ${textType === "Document" ? "!bg-primary/10" : ""} cursor-pointer rounded`}
        >
          <FileText width={20} color={"rgb(25,103,210)"} />
          <span className="text-sm text-accent">Document</span>
        </button>

        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-outline m-1 h-9 min-h-9 rounded border-[rgb(218,220,224)] font-normal text-accent hover:bg-primary/10"
          >
            {from || "All"}
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1]  w-52 rounded border border-[rgb(218,220,224)] bg-white/65 p-2 text-tertiary shadow"
          >
            <li onClick={() => setFrom("English")}>
              <a>English</a>
            </li>
            <li onClick={() => setFrom("Efik")}>
              <a>Efik</a>
            </li>
          </ul>
        </div>

        <button className="tablet-md:mx-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-black/10">
          <Icon path={mdiSwapHorizontal} size={24} />
        </button>

        <div
          className={`dropdown ${from ? "" : "pointer-events-none opacity-30"}`}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn btn-outline m-1 h-9 min-h-9 rounded border-[rgb(218,220,224)] font-normal text-accent hover:bg-primary/10"
          >
            {to || "All"}
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1]  w-52 rounded border border-[rgb(218,220,224)] bg-white/65 p-2 text-tertiary shadow"
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
        <Link href={"/request"} className="min-h-9 h-9 btn btn-outline btn-primary mr-2 flex !border-primary !text-primary hover:!bg-primary hover:!text-white rounded-1">
          <Plus width={20} />
          Request
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <label className="input input-bordered flex h-9 items-center gap-2 rounded border-[rgb(218,220,224)] bg-transparent !outline-none">
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
            className="btn btn-outline m-1 h-9 min-h-9 rounded border-[rgb(218,220,224)] font-normal text-[rgb(25,103,210)] hover:bg-primary/10"
          >
            {sort ?? "Sort By"}
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1]  w-52 rounded border border-[rgb(218,220,224)] bg-white/65 p-2 text-tertiary shadow"
          >
            <li onClick={() => setSort("Popular")}>
              <a>Popular</a>
            </li>
            <li onClick={() => setSort("Recent")}>
              <a>Recent</a>
            </li>
            <li onClick={() => setSort("Easiest")}>
              <a>Easiest</a>
            </li>
            <li onClick={() => setSort("Hardest")}>
              <a>Hardest</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filters;
