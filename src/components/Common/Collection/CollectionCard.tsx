import React from "react";
import { MoreVertical, User } from "react-feather";
import Icon from "@mdi/react";
import { mdiSwapHorizontal } from "@mdi/js";
import { ClockIcon } from "@/components/Shared/Icons";

const CollectionCard = () => {
  return (
    <div className="corpus relative flex min-h-[166px] w-[420px] flex-col justify-between gap-6 rounded border border-black/10 bg-yellow-50 px-4 pb-3 pt-3">
      <div className="flex w-full">
        <div className="flex grow flex-col gap-2">
          <p className="z-0  whitespace-pre-wrap text-2xl/8 text-tertiary">
            This is a text to be translated
          </p>
          <div className="rounded bg-gray-300 px-3 py-2 text-sm">
            This is a text djshd djhs nmskk lihds
          </div>
          <div className="rounded bg-gray-300 px-3 py-2 text-sm">
            This is a text djshd djhs nmskk lihds
          </div>
          <div className="rounded bg-gray-300 px-3 py-2 text-sm">
            This is a text djshd djhs nmskk lihds
          </div>
          <div className="rounded bg-gray-300 px-3 py-2 text-sm">
            This is a text djshd djhs nmskk lihds
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/30 pl-3">
          <div className="gap-0.5 p-1 text-[10px] text-tertiary">
            <ClockIcon />2 mins
          </div>

          <button className="mx-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-black/10">
            <MoreVertical height={16} />
          </button>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex gap-1">
          <span className="text-[10px] text-tertiary">Multiple</span>
          <button className="mx-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-black/10">
            <Icon path={mdiSwapHorizontal} size={14} />
          </button>
          <span className="text-[10px] text-tertiary">Multiple</span>
        </div>

        <div className="flex gap-1">
          <div className="rounded-3xlpy-1 flex gap-1 px-1.5 text-[10px]">
            <User />
            10 answered
          </div>
          <div className="rounded-3xl bg-gray-300 px-1.5 py-1 text-[10px] text-tertiary">
            3 cards
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
