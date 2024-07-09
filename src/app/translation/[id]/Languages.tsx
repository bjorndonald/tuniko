"use client";
import React, { useEffect } from "react";
import { mdiSwapHorizontal } from "@mdi/js";
import Icon from "@mdi/react";
import cx from "classnames";
import CorpusText from "@/types/corpustext";
import useLanguageStore from "@/store/language";
import { ENGLISH_LANGUAGE_ID } from "@/constants/strings";
import Language from "@/types/language";

interface Props {
  corpus: CorpusText;
  languages: Language[];
}

const Languages = ({ corpus }: Props) => {
  const isEditing = useLanguageStore(s => s.isEditing);
  // const setLanguageTo = useLanguageStore(s => s.setLanguageTo);
  const setLanguageFrom = useLanguageStore(s => s.setLanguageFrom);
  const languageFrom = useLanguageStore(s => s.languageFrom);
  const languageTo = useLanguageStore(s => s.languageTo);
  const reset = useLanguageStore(s => s.reset);
  const swap = useLanguageStore(s => s.swap);

  useEffect(() => {
    setLanguageFrom(corpus.language_from.id);

    return () => {
      reset();
    };
  }, []);

  return (
    <div className=" flex items-center">
      {/* <div className="dropdown flex-1 tablet-md:hidden">
        <div
          tabIndex={0}
          role="button"
          className="flex h-9 min-h-9 w-full items-center  justify-center rounded-0 border-[rgb(218,220,224)] text-lg font-normal text-[rgb(25,103,210)] hover:bg-primary/10"
        >
          {languages.find(x => x.id === languageTo)?.name}
        </div>
        <ul
          tabIndex={0}
          className="rounded text-tertiary menu  dropdown-content z-[1] w-full border border-[rgb(218,220,224)] bg-white/65 p-2 shadow"
        >
          {languages.map((x, i) => (
            <li key={i} onClick={() => setLanguageTo(x.id)}>
              <a className="flex gap-1">{x.name}</a>
            </li>
          ))}
        </ul>
      </div> */}
      <div className="tabs tabs-bordered  flex-1 px-2 ">
        <a
          role="tab"
          onClick={() => {
            swap();
          }}
          className={cx(
            "text-tertiary tab h-12 w-fit px-2 text-sm font-medium transition-colors hover:text-black",
            languageTo === ENGLISH_LANGUAGE_ID &&
              "tab-active !border-b-primary !text-primary",
          )}
        >
          {corpus.language_to.name}
        </a>
        {/* {isEditing && (
          <a
            role="tab"
            onClick={() => {
              setLanguageTo(corpus.language_from.id);
            }}
            className={cx(
              "text-tertiary tab h-12 px-2 text-sm font-medium transition-colors hover:text-black",
              languageTo === corpus.language_from.id &&
                "tab-active !border-b-primary !text-primary",
            )}
          >
            {corpus.language_from.name}
          </a>
        )} */}
      </div>
      <button
        onClick={swap}
        className={cx(
          "mx-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-black/10",
          !isEditing && "btn-disabled",
        )}
      >
        <Icon
          color={!isEditing ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,1)"}
          path={mdiSwapHorizontal}
          size={1}
        />
      </button>
      {/* <div className="dropdown flex-1 tablet-md:hidden">
        <div
          tabIndex={0}
          role="button"
          className="flex h-9 min-h-9 w-full items-center  justify-center rounded-0 border-[rgb(218,220,224)] text-lg font-normal text-[rgb(25,103,210)] hover:bg-primary/10"
        >
          {languages.find(x => x.id === languageFrom)?.name}
        </div>
        <ul
          tabIndex={0}
          className="rounded text-tertiary menu  dropdown-content z-[1] w-full border border-[rgb(218,220,224)] bg-white/65 p-2 shadow"
        >
          {languages.map((x, i) => (
            <li key={i} onClick={() => setLanguageFrom(x.id)}>
              <a className="flex gap-1">{x.name}</a>
            </li>
          ))}
        </ul>
      </div> */}
      <div className="tabs tabs-bordered flex-1 px-2">
        <a
          role="tab"
          onClick={() => {
            setLanguageFrom(corpus.language_from.id);
          }}
          className={cx(
            "text-tertiary tab h-12 w-fit px-2 text-sm font-medium transition-colors hover:text-black",
            languageFrom === corpus.language_from.id &&
              "tab-active !border-b-primary !text-primary",
          )}
        >
          {corpus.language_from.name}
        </a>
        {/* {isEditing && (
          <a
            role="tab"
            onClick={() => {
              swap();
            }}
            className={cx(
              "text-tertiary tab h-12 px-2 text-sm font-medium transition-colors hover:text-black",
              languageFrom === ENGLISH_LANGUAGE_ID &&
                "tab-active !border-b-primary !text-primary",
            )}
          >
            English
          </a>
        )} */}
      </div>
    </div>
  );
};

export default Languages;
