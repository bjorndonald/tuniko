"use client";
import React, { ComponentProps, useState } from "react";
import Autocomplete from "./Autocomplete";
import { X } from "react-feather";
import { Pagination } from "@/components/Common/Pagination";
import Setting from "@/types/setting";
import { getCorpus } from "@/actions/corpus";
import { getCorpusSettings, postSetting } from "@/actions/settings";
import toast from "react-hot-toast";

interface Props extends ComponentProps<"form"> {
  corpusSettings: Setting[];
  email: string;
}

const TrackCorpusText = (props: Props) => {
  const { corpusSettings, email, ...rest } = props;
  const [page, setPage] = useState(1);
  const [settings, setSettings] = useState<Setting[]>(corpusSettings);
  const [corpus, setCorpus] = useState<{ id: string; text: string }>();

  const changeOption = (newAction: string, corpusId: string) => {
    const old = settings.find(y => corpusId === y.value_id);
    const tmp = settings.filter(y => corpusId !== y.value_id);
    setSettings([
      {
        action: newAction,
        actor: email,
        type: "notification",
        value: "corpus",
        value_id: corpusId,
        value_obj: {
          text: old.value_obj.text,
        },
      },
      ...tmp,
    ]);
  };

  const removeRow = (corpusId: string) => {
    const tmp = settings.filter(y => corpusId !== y.value_id);
    setSettings(tmp);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    try {
      toast.loading("Loading...", { id: "loading" });
      await postSetting(email, "corpus", settings);
      toast.remove("loading");
      toast.success("Settings saved.");
    } catch (error) {
      toast.remove("loading");
      toast.error("Failed to save data");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-7" {...rest}>
      <h3 className="mb-2 text-lg">Track Corpus request</h3>
      <div className="mb-3 flex justify-between gap-4">
        <div className="flex gap-4">
          <Autocomplete
            getSuggestions={async (str: string) => {
              const suggestions = await getCorpus(
                1,
                "Recent",
                str,
                "All",
                "All",
                6,
              );
              return suggestions.map(x => ({ id: x.id, text: x.text }));
            }}
            chooseSuggestion={x => setCorpus(x)}
          />
          {!!corpus && (
            <div className="max-w-40 whitespace-nowrap border border-black/15 bg-black/10 p-2 text-sm">
              {corpus.text}
            </div>
          )}
        </div>

        <button
          onClick={e => {
            e.preventDefault();
            if (!corpus) return;
            setCorpus(undefined);
            if (settings.find(y => y.value_id === corpus.id)) return;
            setSettings([
              {
                action: "all",
                actor: email,
                type: "notification",
                value: "corpus",
                value_id: corpus.id,
                value_obj: {
                  text: corpus.text,
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
                  <h5 className="text-sm">{x.value_obj?.text}</h5>
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="rounded btn btn-outline m-1 h-9 min-h-9 border-base-300 font-normal text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      {x.action === "all" && "All updates"}
                      {x.action === "choosing" && "Chosen translation"}
                      {x.action === "update" && "Corpus edits"}
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
                          changeOption("choosing", x.value_id);
                        }}
                      >
                        <a>Chosen translation</a>
                      </li>
                      <li
                        onClick={() => {
                          changeOption("update", x.value_id);
                        }}
                      >
                        <a>Corpus edits</a>
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
                getCorpusSettings(email, p).then(res => {
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

export default TrackCorpusText;
