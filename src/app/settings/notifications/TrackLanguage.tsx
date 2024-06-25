"use client";
import React, { ComponentProps, useState } from "react";
import Autocomplete from "./Autocomplete";
import Language from "@/types/language";
import { getLanguages } from "@/actions/language";
import { X } from "react-feather";
import { Pagination } from "@/components/Common/Pagination";
import Setting from "@/types/setting";
import { getSettings } from "@/actions/settings";

interface Props extends ComponentProps<"form"> {
  languageSettings: Setting[];
  email: string;
  languages: Language[];
}

const TrackLanguage = (props: Props) => {
  const {
    languageSettings: initialSettings,
    languages,
    email,
    ...rest
  } = props;
  const [page, setPage] = useState(1);
  const [settings, setSettings] = useState<Setting[]>(initialSettings);
  const [language, setLanguage] = useState<{ id: string; text: string }>();
  return (
    <form {...rest} className="mb-7">
      <h3 className="mb-2 text-lg">Track languages</h3>
      <div className="mb-3 flex justify-between gap-4">
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

        <button
          onClick={e => {
            e.preventDefault();
            setSettings([
              ...settings,
              {
                action: "all",
                actor: email,
                type: "Notifications",
                value: "language",
                value_id: language.id,
              },
            ]);
          }}
          className="btn btn-outline btn-primary btn-sm"
        >
          Add
        </button>
      </div>
      <div
        className={
          "flex min-h-48 w-full  flex-col gap-4 rounded-1 border border-base-300 px-4 py-2"
        }
      >
        <div className="mb-4 flex grow flex-col gap-4">
          {settings.map((x, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h5 className="text-sm">
                  {languages.find(y => y.id === x.value_id)?.name}
                </h5>
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="rounded btn btn-outline m-1 h-9 min-h-9 border-base-300 font-normal text-primary hover:bg-primary/10 hover:text-primary"
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
                      <a>Translation updates</a>
                    </li>
                  </ul>
                </div>
              </div>

              <button className="btn btn-circle btn-outline btn-xs">
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          {settings.length != 10 && (
            <Pagination
              totalCount={2}
              size="sm"
              currentPage={page}
              pageSize={10}
              onPageChange={p => {
                setPage(p);
                getSettings(email, p).then(res => {
                  setSettings(res);
                });
              }}
            />
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="submit"
          className="btn btn-outline btn-primary btn-sm btn-wide"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TrackLanguage;
