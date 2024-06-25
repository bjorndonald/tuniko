"use client";
import { TextIcon } from "@/components/Shared/Icons";
import useLanguageStore from "@/store/language";
import React from "react";
import { FileText } from "react-feather";
const Options = () => {
  const entryType = useLanguageStore(s => s.entryType);
  const setEntryType = useLanguageStore(s => s.setEntryType);

  return (
    <div className="flew-row flex h-[68px] items-center justify-between ">
      <div className="flex items-center gap-2">
        {entryType === "Text" && (
          <>
            <button
              onClick={() => setEntryType("Text")}
              className={`flex h-9 items-center gap-1.5 border border-[rgb(218,220,224)] pl-[11px] pr-[15px] transition hover:bg-primary/10 ${entryType === "Text" ? "!bg-primary/10" : ""} rounded cursor-pointer`}
            >
              <TextIcon />
              <span className="text-sm text-primary">Text</span>
            </button>
          </>
        )}

        {entryType === "Document" && (
          <>
            <div className="dropdown dropdown-end dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost  text-info"
              >
                <button
                  disabled
                  onClick={() => setEntryType("Document")}
                  className={`mr-3 hidden h-9 items-center gap-1.5 border border-base-300 pl-[11px] pr-[15px] transition hover:bg-primary/10 disabled:opacity-60 tablet-md:flex ${entryType === "Document" ? "!bg-primary/10" : ""} rounded cursor-pointer`}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Options;
