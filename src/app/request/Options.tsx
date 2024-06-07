"use client";
import { TextIcon } from "@/components/Shared/Icons";
import { ALL_LANGUAGE_ID, ENGLISH_LANGUAGE_ID } from "@/constants/strings";
import useLanguageStore from "@/store/language";
import Language from "@/types/language";
import { mdiSwapHorizontal } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { FileText } from "react-feather";

interface Props {
  languages: Language[];
}

const Options = ({ languages }: Props) => {
  const [hover, setHover] = useState(false);
  const setLanguageFrom = useLanguageStore(s => s.setLanguageFrom);
  const setLanguageTo = useLanguageStore(s => s.setLanguageTo);
  const languageFrom = useLanguageStore(s => s.languageFrom);
  const languageTo = useLanguageStore(s => s.languageTo);
  const entryType = useLanguageStore(s => s.entryType);
  const setEntryType = useLanguageStore(s => s.setEntryType);
  const reset = useLanguageStore(s => s.reset);
  const swap = useLanguageStore(s => s.swap);

  useEffect(() => {
    setLanguageFrom(languages[0].id);

    return () => {
      reset();
    };
  }, []);

  return (
    <div className="flew-row flex h-[68px] items-center justify-between ">
      <div className="flex items-center gap-2">
        <div className="dropdown tablet-md:hidden">
          <div
            tabIndex={0}
            role="button"
            className="rounded btn btn-outline m-1 h-9 min-h-9 border-[rgb(218,220,224)] font-normal text-[rgb(25,103,210)] hover:bg-primary/10"
          >
            {entryType}
          </div>
          <ul
            tabIndex={0}
            className="rounded menu dropdown-content  z-[1] w-52 border border-[rgb(218,220,224)] bg-white/65 p-2 text-tertiary shadow"
          >
            <li onClick={() => setEntryType("Text")}>
              <a className="flex gap-1">
                <TextIcon />
                Text
              </a>
            </li>
            <li
              className="dropdown"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              //  onClick={() => setTextType("Document")}
            >
              <a tabIndex={0} role="button" className="flex gap-1 opacity-60">
                <FileText width={20} color={"rgb(25,103,210)"} />
                Document
              </a>
              {hover && (
                <div
                  tabIndex={0}
                  className="card dropdown-content compact z-[1] w-64 rounded-box bg-base-100 shadow"
                >
                  <div tabIndex={0} className="card-body">
                    <h2 className="card-title">Coming soon...</h2>
                    <p>This feature is still being worked on.</p>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
        <button
          onClick={() => setEntryType("Text")}
          className={`hidden h-9 items-center gap-1.5 border border-divider pl-[11px] pr-[15px] transition hover:bg-primary/10 tablet-md:flex ${entryType === "Text" ? "!bg-primary/10" : ""} rounded cursor-pointer`}
        >
          <TextIcon />
          <span className="text-sm text-primary">Text</span>
        </button>

        <div className="dropdown dropdown-end dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-ghost text-info">
            <button
              disabled
              onClick={() => setEntryType("Document")}
              className={`mr-3 hidden h-9 items-center gap-1.5 border border-divider pl-[11px] pr-[15px] transition hover:bg-primary/10 disabled:opacity-60 tablet-md:flex ${entryType === "Document" ? "!bg-primary/10" : ""} rounded cursor-pointer`}
            >
              <FileText width={20} color={"rgb(25,103,210)"} />
              <span className="text-sm text-primary">Document</span>
            </button>
          </div>
          <div
            tabIndex={0}
            className="card dropdown-content compact z-[1] w-64 rounded-box bg-base-100 shadow"
          >
            <div tabIndex={0} className="card-body">
              <h2 className="card-title">Coming soon...</h2>
              <p>This feature is still being worked on.</p>
            </div>
          </div>
        </div>

        <div className="tabs tabs-bordered flex grow">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="rounded hover:bg-background/10 btn btn-outline m-1 h-9 min-h-9 border-divider font-normal text-secondary-txt"
            >
              {languages.find(x => x.id === languageFrom)?.name || "Select"}
            </div>
            <ul
              tabIndex={0}
              className="rounded menu dropdown-content  z-[1] w-52 border border-secondary-txt bg-background p-2 text-secondary-txt shadow"
            >
              {languages.map((x, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setLanguageFrom(x.id);
                    setLanguageTo(
                      x.id === ENGLISH_LANGUAGE_ID
                        ? languages[0].id
                        : ENGLISH_LANGUAGE_ID,
                    );
                  }}
                >
                  <a>{x.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={swap}
            className="mx-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-divider p-2 hover:bg-black/10"
          >
            <Icon path={mdiSwapHorizontal} size={24} />
          </button>

          <div
            className={`dropdown ${languageFrom ? "" : "pointer-events-none opacity-30"}`}
          >
            <div
              tabIndex={0}
              role="button"
              className="rounded btn btn-outline m-1 h-9 min-h-9 border-divider font-normal text-secondary-txt hover:bg-primary/10"
            >
              {languages.find(x => x.id === languageTo)?.name || "Select"}
            </div>
            <ul
              tabIndex={0}
              className="rounded menu dropdown-content  z-[1] w-52 border border-secondary-txt bg-background p-2 text-secondary-txt shadow"
            >
              <li
                onClick={() => {
                  setLanguageTo(ALL_LANGUAGE_ID);
                }}
              >
                <a>All</a>
              </li>
              {languages.map((x, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setLanguageTo(x.id);
                    setLanguageFrom(
                      x.id === ENGLISH_LANGUAGE_ID
                        ? languages[0].id
                        : ENGLISH_LANGUAGE_ID,
                    );
                  }}
                >
                  <a>{x.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
