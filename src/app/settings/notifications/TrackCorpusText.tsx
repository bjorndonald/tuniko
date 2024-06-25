"use client";
import React, { ComponentProps, useState } from "react";
import Autocomplete from "./Autocomplete";
import Language from "@/types/language";
import { getLanguages } from "@/actions/language";
import { X } from "react-feather";
import { Pagination } from "@/components/Common/Pagination";

interface Props extends ComponentProps<"form"> {
  languages: Language[];
}

const TrackCorpusText = (props: Props) => {
  const { languages: initialLanguages, ...rest } = props;
  const [page, setPage] = useState(1);
  const [languages, setLanguages] = useState<Language[]>(initialLanguages);
  const [language, setLanguage] = useState<{ id: string; text: string }>();
  return (
    <form {...rest}>
      <h3 className="mb-2 text-lg">Track Corpus request</h3>
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <Autocomplete
            getSuggestions={async (str: string) => {
              const suggestions = await getLanguages(1, str);
              return suggestions.map(x => ({ id: x.id, text: x.name }));
            }}
            chooseSuggestion={x => setLanguage(x)}
          />
          {!!language && (
            <div className="max-w-40 whitespace-nowrap border border-black/15 bg-black/10 p-2 text-sm">
              {language.text}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-outline btn-primary">
          Add
        </button>
      </div>
      <div
        className={
          "mb-7 flex w-full gap-4 rounded-1 border border-base-300 p-4"
        }
      >
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <h5>Nwed</h5>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="rounded btn btn-outline m-1 h-9 min-h-9 border-base-300 font-normal text-primary hover:bg-primary/10"
                >
                  All updates
                </div>
                <ul
                  tabIndex={0}
                  className="rounded bg-background text-tertiary-txt  menu dropdown-content z-[1] w-52 border border-base-300 p-2 shadow"
                >
                  <li>
                    <a>All updates</a>
                  </li>
                  <li>
                    <a>Corpus updates</a>
                  </li>
                  <li>
                    <a>Choice updates</a>
                  </li>
                  <li>
                    <a>Translation updates</a>
                  </li>
                </ul>
              </div>
            </div>

            <button className="btn btn-circle btn-ghost">
              <X />
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          {languages.length != 10 && (
            <Pagination
              totalCount={2}
              currentPage={page}
              pageSize={10}
              onPageChange={p => {
                setPage(p);
                getLanguages(p).then(res => {
                  setLanguages(res);
                });
              }}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default TrackCorpusText;
