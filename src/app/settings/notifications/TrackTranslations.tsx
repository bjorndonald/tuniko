"use client";
import React, { ComponentProps, ReactNode, useState } from "react";
import Autocomplete from "./Autocomplete";
import { X } from "react-feather";
import { Pagination } from "@/components/Common/Pagination";
import Setting from "@/types/setting";
import { getTranslationSettings, postSetting } from "@/actions/settings";
import toast from "react-hot-toast";
import { getTranslationsByUser } from "@/actions/translation";

interface Props extends ComponentProps<"form"> {
  translationSettings: Setting[];
  email: string;
}

const TrackTranslation = (props: Props) => {
  const { translationSettings, email, ...rest } = props;
  const [page, setPage] = useState(1);
  const [settings, setSettings] = useState<Setting[]>(translationSettings);
  const [translation, setTranslation] = useState<{
    id: string;
    text: string;
    other?: string;
    display?: string | ReactNode;
  }>();

  const changeOption = (newAction: string, tId: string) => {
    const old = settings.find(y => tId === y.value_id);
    const tmp = settings.filter(y => tId !== y.value_id);
    setSettings([
      {
        action: newAction,
        actor: email,
        type: "notification",
        value: "translation",
        value_id: tId,
        value_obj: {
          translation: {
            text: old.value_obj.translation.text,
          },
          corpustext: {
            text: old.value_obj.corpustext.text,
          },
        },
      },
      ...tmp,
    ]);
  };

  const removeRow = (tId: string) => {
    const tmp = settings.filter(y => tId !== y.value_id);
    setSettings(tmp);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    try {
      toast.loading("Loading...", { id: "loading" });
      await postSetting(email, "translation", settings);
      toast.remove("loading");
      toast.success("Settings saved.");
    } catch (error) {
      toast.remove("loading");
      toast.error("Failed to save data");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4" {...rest}>
      <h3 className="mb-2 text-lg">Track Translations</h3>
      <div className="mb-3 flex justify-between gap-4">
        <div className="flex gap-4">
          <Autocomplete
            getSuggestions={async (str: string) => {
              const suggestions = await getTranslationsByUser(email, 1, str);
              return suggestions.map(x => ({
                id: x.translation.id,
                display: (
                  <div className="flex flex-col">
                    <p className="text-base font-semibold">
                      {x.translation.text} -{" "}
                      <small className="text-sm  text-base-content/75">
                        {x.corpustext.text}
                      </small>
                    </p>
                  </div>
                ),
                other: x.corpustext.text,
                text: x.translation.text,
              }));
            }}
            chooseSuggestion={x => setTranslation(x)}
          />
          {!!translation && (
            <div className="max-w-40 whitespace-nowrap border border-black/15 bg-black/10 p-2 text-sm">
              {translation.display || translation.text}
            </div>
          )}
        </div>

        <button
          onClick={e => {
            e.preventDefault();
            if (!translation) return;
            setTranslation(undefined);
            if (settings.find(y => y.value_id === translation.id)) return;
            setSettings([
              {
                action: "all",
                actor: email,
                type: "notification",
                value: "translation",
                value_id: translation.id,
                value_obj: {
                  translation: {
                    text: translation.text,
                  },
                  corpustext: {
                    text: translation.other,
                  },
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
                  <h5 className="text-sm">
                    <div className="flex flex-col">
                      <p className="text-base font-semibold">
                        {x.value_obj.translation.text} -{" "}
                        <small className="text-sm text-base-content/75">
                          {x.value_obj.corpustext.text}
                        </small>
                      </p>
                    </div>
                  </h5>
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="rounded btn btn-outline m-1 h-9 min-h-9 border-base-300 font-normal text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      {x.action === "all" && "All updates"}
                      {x.action === "choosing" && "Chosen translation"}
                      {x.action === "upvote" && "Upvotes"}
                      {x.action === "downvote" && "Downvotes"}
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
                          changeOption("choosing", x.value_id);
                        }}
                      >
                        <a>Chosen translation</a>
                      </li>
                      <li
                        onClick={() => {
                          changeOption("upvote", x.value_id);
                        }}
                      >
                        <a>Upvotes</a>
                      </li>
                      <li
                        onClick={() => {
                          changeOption("downvote", x.value_id);
                        }}
                      >
                        <a>Downvotes</a>
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
                getTranslationSettings(email, p).then(res => {
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

export default TrackTranslation;
