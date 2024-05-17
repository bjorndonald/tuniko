import React from "react";
import ClockIcon from "./Clock.icon";
import { MoreVertical, User, Check } from "react-feather";
import Icon from "@mdi/react";
import { mdiSwapHorizontal } from "@mdi/js";

const CorpusCard = () => {
  return (
    <div className="corpus relative flex min-h-[166px] w-[420px] flex-col justify-between rounded border border-black/10 px-4 pb-3 pt-3">
      <div className="flex w-full grow">
        <p className="z-0 grow whitespace-pre-wrap text-2xl/8 text-tertiary">
          This is a text to be translated
        </p>
        <div className="flex h-fit items-center gap-2 bg-white/30 pl-3">
          <div className="flex items-center gap-0.5 whitespace-nowrap rounded-full bg-black/[0.05] p-1 pr-2 text-[10px] text-tertiary">
            <ClockIcon />2 mins
          </div>

          <button className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-black/10">
            <MoreVertical height={16} />
          </button>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex gap-1">
          <span className="text-[10px] text-tertiary">English</span>
          <button className="mx-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-black/10">
            <Icon path={mdiSwapHorizontal} size={1} />
          </button>
          <span className="text-[10px] text-tertiary">Efik</span>
        </div>

        <div className="flex gap-1">
          <div className="flex items-center gap-1 rounded-3xl border-primary bg-primary/20 px-1.5 py-1 text-[10px] text-primary">
            <Check size={12} color="rgb(25,103,210)" />
            Chosen
          </div>
          <div className="rounded-3xlpy-1 flex items-center gap-1 px-1.5 text-[10px]">
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

export default CorpusCard;
