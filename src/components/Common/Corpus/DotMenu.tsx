import useCorpus from "@/store/corpus";
import React from "react";
import { MoreVertical } from "react-feather";

const DotMenu = ({ id }: { id: string }) => {
  const addSelected = useCorpus(s => s.addSelected);
  return (
    <div className="dropdown max-mobile-lg:dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-ghost btn-xs text-info"
      >
        <MoreVertical height={16} />
      </div>
      <ul
        tabIndex={0}
        className="rounded text-tertiary menu  dropdown-content z-[1] w-28 border border-[rgb(218,220,224)] bg-white/65 p-2 shadow"
      >
        <li>
          <a onClick={() => addSelected(id)}>Select</a>
        </li>
        <li>
          <a>Hide</a>
        </li>
        <li>
          <a>Share</a>
        </li>
        <li>
          <a>Translate</a>
        </li>
      </ul>
    </div>
  );
};

export default DotMenu;
