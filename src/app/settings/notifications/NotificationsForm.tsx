"use client";
import { getCorpus, postCorpusSuggestions } from "@/actions/corpus";
import CorpusText from "@/types/corpustext";
import cx from "@/utils/cx";
import { Session } from "next-auth";
import React, { ComponentProps, useState } from "react";
import { Search } from "react-feather";
import BadgeGrid from "./BadgeGrid";
import Language from "@/types/language";

interface Props extends ComponentProps<"form"> {
  session: Session;
  languages: Language[];
}

const NotificationsForm = (props: Props) => {
  const { session, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const [ownedRequestsCustom, setOwnedRequestsCustom] = useState(false);
  const [searchCorpus, setSearchCorpus] = useState("");
  const [suggestedCorpus, setSuggestedCorpus] = useState<CorpusText[]>([]);
  const [chosenOwnedCorpus, setChosenOwnedCorpus] = useState<CorpusText[]>([]);

  return (
    <form {...rest}>
      <h3 className="mb-2 text-lg">Browser Updates</h3>
      <div className="mb-7 flex items-center gap-4">
        <div className="form-control">
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox-primary checkbox checkbox-sm"
            />
            <span className="label-text">Get browser updates</span>
          </label>
        </div>
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="rounded btn btn-outline m-1 h-9 min-h-9 border-base-300 font-normal text-primary hover:bg-primary/10"
          >
            Daily
          </div>
          <ul
            tabIndex={0}
            className="rounded bg-background text-tertiary-txt  menu dropdown-content z-[1] w-52 border border-base-300 p-2 shadow"
          >
            <li>
              <a>Hourly</a>
            </li>
            <li>
              <a>Daily</a>
            </li>
            <li>
              <a>Weekly</a>
            </li>
          </ul>
        </div>
      </div>

      <h3 className="mb-2 text-lg">Get Translation Updates</h3>
      <div className="mb-4 flex items-center gap-4">
        <div className="form-control">
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              checked={ownedRequestsCustom}
              onChange={e => setOwnedRequestsCustom(!ownedRequestsCustom)}
              className="checkbox-primary checkbox checkbox-sm"
            />
            <span className="label-text">For all your corpus requests</span>
          </label>
        </div>

        <div
          className={cx(
            "dropdown",
            !!suggestedCorpus.length && !loading && "dropdown-open",
          )}
        >
          <label className="input input-sm input-bordered flex items-center gap-2">
            <input
              disabled={ownedRequestsCustom}
              value={searchCorpus}
              type="text"
              className="grow"
              placeholder="Search here"
              onChange={async e => {
                setSearchCorpus(e.target.value);
                setLoading(true);
                const suggested = await postCorpusSuggestions(
                  session.user.email,
                  e.target.value,
                );
                console.log(suggested);
                setLoading(false);
                setSuggestedCorpus(suggested);
              }}
            />
            <Search size={14} />
          </label>
          {!!suggestedCorpus.length && !loading && (
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {suggestedCorpus.map((x, i) => (
                <li key={i}>
                  <a
                    onClick={() => {
                      if (!chosenOwnedCorpus.find(y => x.id === y.id))
                        setChosenOwnedCorpus([...chosenOwnedCorpus, x]);
                      setSuggestedCorpus([]);
                    }}
                  >
                    {x.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div
        className={cx(
          "mb-7 flex w-full gap-4 rounded-1 border border-base-300 p-4",
          !!ownedRequestsCustom && "opacity-50",
        )}
      >
        <BadgeGrid id="corpus-owned" corpuslist={chosenOwnedCorpus} />
      </div>

      <div className="mb-4 flex items-center gap-4">
        <h4 className="text-base">Other corpus requests</h4>

        <div
          className={cx(
            "dropdown",
            !!suggestedCorpus.length && !loading && "dropdown-open",
          )}
        >
          <label className="input input-sm input-bordered flex items-center gap-2">
            <input
              disabled={ownedRequestsCustom}
              value={searchCorpus}
              type="text"
              className="grow"
              placeholder="Search here"
              onChange={async e => {
                setSearchCorpus(e.target.value);
                setLoading(true);
                const suggested = await getCorpus(1, "Recent", e.target.value);
                console.log(suggested);
                setLoading(false);
                setSuggestedCorpus(suggested);
              }}
            />
            <Search size={14} />
          </label>
          {!!suggestedCorpus.length && !loading && (
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {suggestedCorpus.map((x, i) => (
                <li key={i}>
                  <a
                    onClick={() => {
                      if (!chosenOwnedCorpus.find(y => x.id === y.id))
                        setChosenOwnedCorpus([...chosenOwnedCorpus, x]);
                      setSuggestedCorpus([]);
                    }}
                  >
                    {x.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div
        className={cx(
          "mb-7 flex w-full gap-4 rounded-1 border border-base-300 p-4",
          !!ownedRequestsCustom && "opacity-50",
        )}
      >
        <BadgeGrid id="corpus-owned" corpuslist={chosenOwnedCorpus} />
      </div>

      <h3 className="mb-2 text-lg">Language Updates</h3>
      <div
        className={cx(
          "mb-7 flex w-full gap-4 rounded-1 border border-base-300 p-4",
          !!ownedRequestsCustom && "opacity-50",
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h4 className="text-base ">All languages</h4>
        </div>
        <div className="flex flex-col"></div>
      </div>
    </form>
  );
};

export default NotificationsForm;
