import cx from "@/utils/cx";
import React, { ComponentProps, useState } from "react";
import { Search } from "react-feather";

interface Props extends ComponentProps<"input"> {
  chooseSuggestion: (suggestion: { id: string; text: string }) => void;
  getSuggestions: (search: string) => Promise<{ id: string; text: string }[]>;
}

const Autocomplete = (props: Props) => {
  const { getSuggestions, chooseSuggestion, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; text: string }[]
  >([]);
  return (
    <div
      className={cx(
        "dropdown",
        !!suggestions.length && !loading && "dropdown-open",
      )}
    >
      <label className="input input-sm input-bordered flex items-center gap-2">
        <input
          {...rest}
          value={search}
          type="text"
          className="grow"
          placeholder="Search here"
          onChange={async e => {
            setSearch(e.target.value);
            setLoading(true);
            const suggested = await getSuggestions(e.target.value);
            setLoading(false);
            setSuggestions(suggested);
          }}
        />
        <Search size={14} />
      </label>
      {!!suggestions.length && !loading && (
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
        >
          {suggestions.map((x, i) => (
            <li key={i}>
              <a
                onClick={() => {
                  chooseSuggestion(x);
                  setSuggestions([]);
                }}
              >
                {x.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
