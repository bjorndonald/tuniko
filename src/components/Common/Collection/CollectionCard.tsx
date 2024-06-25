import React from "react";
import { ArrowRight, MoreVertical, User } from "react-feather";

import { ClockIcon } from "@/components/Shared/Icons";

const CollectionCard = () => {
  return (
    <div className="corpus rounded relative mb-4 flex min-h-[166px] w-[410px] flex-col justify-between gap-6 border border-black/10 bg-yellow-50 px-4 pb-3 pt-3">
      <div className="flex w-full">
        <div className="flex grow flex-col gap-2">
          <small className="text-xs">Collection</small>
          <p className="text-tertiary  z-0 whitespace-pre-wrap text-2xl/8">
            This is a text to be translated
          </p>
        </div>

        <div className="flex h-fit items-center gap-2 pl-3">
          <div className="text-tertiary flex gap-0.5 whitespace-nowrap p-1 text-[10px]">
            <ClockIcon />2 mins
          </div>

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
              className="rounded text-tertiary menu  dropdown-content z-[1] w-28 border border-[rgb(218,220,224)] bg-white/65 p-2 shadow"
            >
              <li>
                <a>Select</a>
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
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <span className="text-tertiary text-[10px]">English</span>
          <span className="mx-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2">
            <ArrowRight size={12} />
          </span>
          <span className="text-tertiary text-[10px]">Efik</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="rounded-3xl bg-gray-100 text-tertiary px-1.5 py-1 text-[10px]">
            3 cards
          </div>
          <div className="rounded-3xl flex items-center gap-1 px-1.5 py-1 text-[10px]">
            <User size={12} />
            10 answered
          </div>

          {/* <button className='w-6 h-6 p-2 mx-1 cursor-pointer rounded-full hover:bg-black/10 flex items-center justify-center'>
                        <Icon path={mdiKeyboard} size={14} />
                    </button> */}
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
