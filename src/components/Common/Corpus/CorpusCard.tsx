"use client";
import React from "react";
import ClockIcon from "./Clock.icon";
import { MoreVertical, User, Check, ArrowRight } from "react-feather";
import $ from "jquery";
import useCorpus from "@/store/corpus";

interface Props {
  corpus: { id: string };
}

const CorpusCard = ({ corpus: { id } }: Props) => {
  const selected = useCorpus(s => s.selected);
  const addSelected = useCorpus(s => s.addSelected);
  const removeSelection = useCorpus(s => s.removeSelection);

  return (
    <div
      id={`${id}`}
      onClick={() => {
        if (selected.includes(id)) {
          removeSelection(id);
          return;
        }
        if (selected.length) {
          addSelected(id);
        }
      }}
      className={`corpus relative mb-4 flex min-h-[166px] w-[410px] flex-col justify-between rounded border border-black/10 
    px-4 pb-3 pt-3 ${selected.includes(id) ? "bg-gray-200" : ""}`}
    >
      <div className="flex w-full grow">
        <p
          onClick={e => {
            alert("h");
            e.stopPropagation();
          }}
          className="z-0 h-fit cursor-pointer whitespace-pre-wrap text-2xl/8 text-tertiary hover:underline"
        >
          This is a text to be translated
        </p>
        <div className="flex h-fit items-center gap-2 pl-3">
          <div className="flex items-center gap-0.5 whitespace-nowrap rounded-full bg-black/[0.05] p-1 pr-2 text-[10px] text-tertiary">
            <ClockIcon />2 mins
          </div>

          <div className="dropdown ">
            <div
              tabIndex={0}
              onClick={e => e.stopPropagation()}
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
                <a
                  onClick={e => {
                    if (selected.includes(id)) {
                      removeSelection(id);
                    } else {
                      addSelected(id);
                    }
                    $(".dropdown").removeClass("dropdown-open");
                    const active = document.activeElement as HTMLElement;
                    active.blur();
                    e.stopPropagation();
                  }}
                >
                  {selected.includes(id) ? "Deselect" : "Select"}
                </a>
              </li>
              <li>
                <a onClick={e => e.stopPropagation()}>Hide</a>
              </li>
              <li>
                <a onClick={e => e.stopPropagation()}>Share</a>
              </li>
              <li>
                <a onClick={e => e.stopPropagation()}>Translate</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-3xl border-red-500/30 bg-red-500/30 px-1.5 py-1 text-[10px] font-medium text-red-500">
            Hard
          </div>

          <div className="flex items-center">
            <span className="text-[10px] text-tertiary">English</span>
            <span className=" flex h-5 w-5 cursor-pointer items-center justify-center rounded-full">
              <ArrowRight size={12} />
            </span>
            <span className="text-[10px] text-tertiary">Efik</span>
          </div>
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
