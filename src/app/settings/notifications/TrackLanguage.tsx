"use client";
import React, { ComponentProps, useState } from "react";
import Autocomplete from "./Autocomplete";
import Language from "@/types/language";
import { getLanguages } from "@/actions/language";
import { X } from "react-feather";
import { Pagination } from "@/components/Common/Pagination";
import Setting from "@/types/setting";
import { getLanguageSettings, postSetting } from "@/actions/settings";
import toast from "react-hot-toast";

interface Props extends ComponentProps<"form"> {
  languageSettings: Setting[];
  email: string;
  languages: Language[];
}

const TrackLanguage = (props: Props) => {
  const {
    languageSettings: initialSettings,

    email,
    ...rest
  } = props;
  const [page, setPage] = useState(1);
  const [settings, setSettings] = useState<Setting[]>(initialSettings);
  const [language, setLanguage] = useState<{ id: string; text: string }>();

  const changeOption = (newAction: string, languageId: string) => {
    const old = settings.find(y => languageId === y.value_id);
    const tmp = settings.filter(y => languageId !== y.value_id);
    setSettings([
      {
        action: newAction,
        actor: email,
        type: "Notifications",
        value: "language",
        value_id: languageId,
        value_obj: {
          name: old.value_obj.name,
        },
      },
      ...tmp,
    ]);
  };

  const removeRow = (languageId: string) => {
    const tmp = settings.filter(y => languageId !== y.value_id);
    setSettings(tmp);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    try {
      toast.loading("Loading...", { id: "loading" });
      await postSetting(email, "language", settings);
      toast.remove("loading");
      toast.success("Settings saved.");
    } catch (error) {
      toast.remove("loading");
      toast.error("Failed to save data");
    }
  };

  return (
    <form onSubmit={handleSubmit} {...rest} className="mb-7">
      <h3 className="mb-2 text-lg">Track languages</h3>
      <div className="mb-3 flex justify-between gap-4">
        <div className="flex gap-4">
          <Autocomplete
            getSuggestions={async (str: string) => {
              const suggestions = await getLanguages(1, str);
              return suggestions
                .filter(x => x.name !== "All")
                .map(x => ({ id: x.id, text: x.name }));
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
            if (!language) return;
            setLanguage(undefined);
            if (settings.find(y => y.value_id === language.id)) return;
            setSettings([
              {
                action: "all",
                actor: email,
                type: "notification",
                value: "language",
                value_id: language.id,
                value_obj: {
                  name: language.text,
                },
              },
              ...settings,
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
        <div className="mb-4 flex grow flex-col gap-2">
          {settings.map((x, i) => {
            return (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h5 className="text-sm">{x.value_obj?.name}</h5>
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="rounded btn btn-outline m-1 h-9 min-h-9 border-base-300 font-normal text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      {x.action === "all" && "All updates"}
                      {x.action === "insert" && "Corpus updates"}
                      {x.action === "translate" && "Translation updates"}
                    </div>
                    <ul
                      tabIndex={0}
                      className="rounded bg-background text-tertiary-txt  menu dropdown-content z-[1] w-52 border border-base-300 p-2 shadow"
                    >
                      <li
                        onClick={() => {
                          changeOption("all", x.value_id);
                        }}
                      >
                        <a>All updates</a>
                      </li>
                      <li
                        onClick={() => {
                          changeOption("insert", x.value_id);
                        }}
                      >
                        <a>Corpus updates</a>
                      </li>
                      <li
                        onClick={() => {
                          changeOption("translate", x.value_id);
                        }}
                      >
                        <a>Translation updates</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={e => {
                    e.preventDefault();
                    removeRow(x.value_id);
                  }}
                  className="btn btn-circle btn-outline btn-xs"
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}
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
                getLanguageSettings(email, p).then(res => {
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
