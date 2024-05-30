"use client";
import { TextIcon } from "@/components/Shared/Icons";
import useLanguageStore from "@/store/language";
import React, { useState } from "react";
import { FileText } from "react-feather";
type TextType = "All" | "Text" | "Document";
const Options = () => {
  const entryType = useLanguageStore(s => s.entryType)
  const setEntryType = useLanguageStore(s => s.setEntryType)
  
  return (
    <div className="flew-row flex h-[68px] items-center justify-between ">
      <div className="flex items-center gap-2">
        {entryType === "Text" && <>
          <button
            onClick={() => setEntryType("Text")}
            className={`flex h-9 items-center gap-1.5 border border-[rgb(218,220,224)] pl-[11px] pr-[15px] transition hover:bg-primary/10 ${entryType === "Text" ? "!bg-primary/10" : ""} cursor-pointer rounded`}
          >
            <TextIcon />
            <span className="text-sm text-primary">Text</span>
          </button>
        </>}
        
        {entryType === "Document" && <>
        <button
          onClick={() => setEntryType("Document")}
          className={`flex h-9 items-center gap-1.5 border border-[rgb(218,220,224)] pl-[11px] pr-[15px] transition hover:bg-primary/10 ${entryType === "Document" ? "!bg-primary/10" : ""} cursor-pointer rounded`}
        >
          <FileText width={20} color={"rgb(25,103,210)"} />
          <span className="text-sm text-primary">Document</span>
        </button>
        </>}
        
      </div>
    </div>
  );
};

export default Options;
