'use client';
import { TextIcon } from '@/components/Shared/Icons';
import React, { useState } from 'react'
import { FileText } from 'react-feather';
type TextType = "All" | "Text" | "Document";
const Options = () => {
    const [textType, setTextType] = useState<TextType>('Text')
    return (
        <div className="flew-row flex h-[68px] items-center justify-between ">
            <div className="flex items-center gap-2">

                <button
                    onClick={() => setTextType("Text")}
                    className={`flex h-9 items-center gap-1.5 border border-[rgb(218,220,224)] pl-[11px] pr-[15px] transition hover:bg-primary/10 ${textType === "Text" ? "!bg-primary/10" : ""} cursor-pointer rounded`}
                >
                    <TextIcon />
                    <span className="text-sm text-primary">Text</span>
                </button>
                <button
                    onClick={() => setTextType("Document")}
                    className={`flex h-9 items-center gap-1.5 border border-[rgb(218,220,224)] pl-[11px] pr-[15px] transition hover:bg-primary/10 ${textType === "Document" ? "!bg-primary/10" : ""} cursor-pointer rounded`}
                >
                    <FileText width={20} color={"rgb(25,103,210)"} />
                    <span className="text-sm text-primary">Document</span>
                </button>
            </div>
        </div>
    )
}

export default Options