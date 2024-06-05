"use client";
import React from "react";
import ClockIcon from "./Clock.icon";
import { MoreVertical, User, Check, ArrowRight } from "react-feather";
import $ from "jquery";
import useCorpus from "@/store/corpus";
import cx from "@/utils/cx";
import moment from "moment";
import CorpusText from "@/types/corpustext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  corpus: CorpusText;
}

const CorpusCard = ({ corpus }: Props) => {
  const navigate = useRouter();
  const showShareModal = useCorpus(s => s.showShareModal);
  const selected = useCorpus(s => s.selected);
  const addSelected = useCorpus(s => s.addSelected);
  const removeSelection = useCorpus(s => s.removeSelection);

  return (
    <div
      id={`${corpus.id}`}
      onClick={() => {
        if (selected.includes(corpus.id)) {
          removeSelection(corpus.id);
          return;
        }
        if (selected.length) {
          addSelected(corpus.id);
        }
      }}
      className={cx(
        `corpus rounded relative mb-4 flex min-h-[166px] w-full flex-col justify-between border border-divider
    px-4 pb-3 pt-3 ${selected.includes(corpus.id) ? "bg-gray-200" : ""}`,
        "tablet-md:w-[calc((100%-16px)/2)] desktop-lg:w-[410px]",
      )}
    >
      <div className="flex w-full grow">
        <p
          onClick={e => {
            navigate.push("/translation/" + corpus.id);
            e.stopPropagation();
          }}
          className="z-0 h-fit grow cursor-pointer whitespace-pre-wrap text-2xl/8 text-secondary-txt hover:underline"
        >
          {corpus.text}
        </p>
        <div className="flex h-fit items-center gap-2 pl-3">
          <div className="flex items-center gap-0.5 whitespace-nowrap rounded-full bg-black/[0.05] p-1 pr-2 text-[10px] text-tertiary">
            <ClockIcon />{" "}
            {moment
              .duration(moment().diff(moment(corpus.created_at)))
              .humanize()}
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
              className="rounded menu dropdown-content  z-[1] w-28 border border-[rgb(218,220,224)] bg-white/65 p-2 text-tertiary shadow"
            >
              <li>
                <Link href={"/request"} onClick={e => e.stopPropagation()}>
                  Translate
                </Link>
              </li>
              <li>
                <a
                  onClick={e => {
                    if (selected.includes(corpus.id)) {
                      removeSelection(corpus.id);
                    } else {
                      addSelected(corpus.id);
                    }
                    $(".dropdown").removeClass("dropdown-open");
                    const active = document.activeElement as HTMLElement;
                    active.blur();
                    e.stopPropagation();
                  }}
                >
                  {selected.includes(corpus.id) ? "Deselect" : "Select"}
                </a>
              </li>
              <li>
                <a
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  Copy
                </a>
              </li>
              <li>
                <a
                  onClick={e => {
                    e.stopPropagation();
                    showShareModal(corpus.id);
                  }}
                >
                  Share
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          {corpus.complexity > 67 && (
            <div className="rounded-3xl flex items-center gap-1 border-green-500/30 bg-green-500/30 px-1.5 py-1 text-[10px] font-medium text-green-500">
              Easy
            </div>
          )}
          {corpus.complexity > 33 && corpus.complexity < 67 && (
            <div className="rounded-3xl flex items-center gap-1 border-red-500/30 bg-red-500/30 px-1.5 py-1 text-[10px] font-medium text-red-500">
              Medium
            </div>
          )}
          {corpus.complexity < 33 && (
            <div className="rounded-3xl flex items-center gap-1 border-red-500/30 bg-red-500/30 px-1.5 py-1 text-[10px] font-medium text-red-500">
              Hard
            </div>
          )}

          <div className="flex items-center">
            <span className="text-[10px] text-tertiary">
              {corpus.language_from.name}
            </span>
            <span className=" flex h-5 w-5 cursor-pointer items-center justify-center rounded-full">
              <ArrowRight size={12} />
            </span>
            <span className="text-[10px] text-tertiary">
              {corpus.language_to.name}
            </span>
          </div>
        </div>

        <div className="flex gap-1">
          {corpus.has_chosen && (
            <div className="rounded-3xl flex items-center gap-1 border-primary bg-primary/20 px-1.5 py-1 text-[10px] text-primary">
              <Check size={12} color="rgb(25,103,210)" />
              Chosen
            </div>
          )}

          <div className="rounded-3xlpy-1 flex items-center gap-1 px-1.5 text-[10px]">
            <User size={12} />
            {corpus.no_of_answers} answered
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
