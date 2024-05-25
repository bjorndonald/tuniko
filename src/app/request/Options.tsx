'use client';
import { TextIcon } from '@/components/Shared/Icons';
import { ENGLISH_LANGUAGE_ID } from '@/constants/languages';
import useLanguageStore from '@/store/language';
import Language from '@/types/language';
import { mdiSwapHorizontal } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react'
import { FileText } from 'react-feather';

type TextType = "All" | "Text" | "Document";

interface Props {
    languages: Language[]
}

const Options = ({languages}: Props) => {
    
    const setLanguageFrom = useLanguageStore(s => s.setLanguageFrom)
    const setLanguageTo = useLanguageStore(s => s.setLanguageTo)
    const languageFrom = useLanguageStore(s => s.languageFrom)
    const languageTo = useLanguageStore(s => s.languageTo)
    const [textType, setTextType] = useState<TextType>('Text')
    const reset = useLanguageStore(s => s.reset)
    const swap = useLanguageStore(s => s.swap)

    useEffect(() => {
      setLanguageFrom(languages[0].id)
    
      return () => {
        reset()
      }
    }, [])
    

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
                    className={`flex h-9 mr-3 items-center gap-1.5 border border-[rgb(218,220,224)] pl-[11px] pr-[15px] transition hover:bg-primary/10 ${textType === "Document" ? "!bg-primary/10" : ""} cursor-pointer rounded`}
                >
                    <FileText width={20} color={"rgb(25,103,210)"} />
                    <span className="text-sm text-primary">Document</span>
                </button>

                <div className="flex grow tabs tabs-bordered">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-outline m-1 h-9 min-h-9 rounded border-[rgb(218,220,224)] font-normal text-[rgb(25,103,210)] hover:bg-primary/10"
                        >
                            {languages.find(x => x.id === languageFrom).name || "Select"}
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content z-[1]  w-52 rounded border border-[rgb(218,220,224)] bg-white/65 p-2 text-tertiary shadow"
                        >
                            {languages.map((x, i) => (
                                <li key={i} onClick={() => {
                                    setLanguageFrom(x.id)
                                    setLanguageTo(x.id === ENGLISH_LANGUAGE_ID ? languages[0].id: ENGLISH_LANGUAGE_ID)
                                    }}>
                                <a>{x.name}</a>
                            </li>
                            ))}
                        </ul>
                    </div>

                    <button onClick={swap} className="mx-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-black/10">
                        <Icon path={mdiSwapHorizontal} size={24} />
                    </button>

                    <div
                        className={`dropdown ${languageFrom ? "" : "pointer-events-none opacity-30"}`}
                    >
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-outline m-1 h-9 min-h-9 rounded border-[rgb(218,220,224)] font-normal text-[rgb(25,103,210)] hover:bg-primary/10"
                        >
                            {languages.find(x => x.id === languageTo).name || "Select"}
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content z-[1]  w-52 rounded border border-[rgb(218,220,224)] bg-white/65 p-2 text-tertiary shadow"
                        >
                            {languages.map((x, i) => (
                                <li key={i} onClick={() => {
                                    setLanguageTo(x.id)
                                    setLanguageFrom(x.id === ENGLISH_LANGUAGE_ID ? languages[0].id : ENGLISH_LANGUAGE_ID)
                                    }}>
                                    <a>{x.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Options