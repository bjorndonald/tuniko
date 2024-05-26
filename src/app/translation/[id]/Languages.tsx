"use client";
import React, { useEffect } from "react";
import { mdiSwapHorizontal } from "@mdi/js";
import Icon from "@mdi/react";
import cx from "classnames";
import CorpusText from "@/types/corpustext";
import useLanguageStore from "@/store/language";
import { ENGLISH_LANGUAGE_ID } from "@/constants/languages";

interface Props {
  corpus: CorpusText;
}

const Languages = ({ corpus }: Props) => {
  const isEditing = useLanguageStore(s => s.isEditing);
  const setLanguageTo = useLanguageStore(s => s.setLanguageTo);
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
      <div className="tabs tabs-bordered flex flex-1 px-2">
        <a
          role="tab"
          onClick={() => {
            swap();
          }}
          className={cx(
            "tab h-12 px-2 text-sm font-medium text-tertiary transition-colors hover:text-black",
            languageTo === ENGLISH_LANGUAGE_ID &&
              "tab-active !border-b-primary !text-primary",
          )}
        >
          English
        </a>
        {isEditing && (
          <a
            role="tab"
            onClick={() => {
              setLanguageTo(corpus.language_from.id);
            }}
            className={cx(
              "tab h-12 px-2 text-sm font-medium text-tertiary transition-colors hover:text-black",
              languageTo === corpus.language_from.id &&
                "tab-active !border-b-primary !text-primary",
            )}
          >
            {corpus.language_from.name}
          </a>
        )}
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
      <div className="tabs tabs-bordered flex flex-1 px-2">
        <a
          role="tab"
          onClick={() => {
            setLanguageFrom(corpus.language_from.id);
          }}
          className={cx(
            "tab h-12 px-2 text-sm font-medium text-tertiary transition-colors hover:text-black",
            languageFrom === corpus.language_from.id &&
              "tab-active !border-b-primary !text-primary",
          )}
        >
          {corpus.language_from.name}
        </a>
        {isEditing && (
          <a
            role="tab"
            onClick={() => {
              swap();
            }}
            className={cx(
              "tab h-12 px-2 text-sm font-medium text-tertiary transition-colors hover:text-black",
              languageFrom === ENGLISH_LANGUAGE_ID &&
                "tab-active !border-b-primary !text-primary",
            )}
          >
            English
          </a>
        )}
      </div>
    </div>
  );
};

export default Languages;
