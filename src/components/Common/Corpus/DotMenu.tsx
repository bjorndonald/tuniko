import useCorpus from "@/store/corpus";
import React from "react";
import { MoreVertical } from "react-feather";

const DotMenu = ({ id }: { id: string }) => {
  const addSelected = useCorpus(s => s.addSelected);
  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-ghost btn-xs text-info"
      >
        <MoreVertical height={16} />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1]  w-28 rounded border border-[rgb(218,220,224)] bg-white/65 p-2 text-tertiary shadow"
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
