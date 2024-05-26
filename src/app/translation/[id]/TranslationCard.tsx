'use client';
import React, { useState } from "react";
import { ThumbsDown, ThumbsUp, ArrowUpRight } from "react-feather";
import { mdiDiamond } from "@mdi/js";
import Icon from "@mdi/react";
import Translation from "@/types/translation";
import useLanguageStore from "@/store/language";
import axios from "axios";

interface Props {
  translation: Translation
}

const TranslationCard = ({translation}: Props) => {
  const setTranslation = useLanguageStore(s => s.setTranslation);
  const [upvotes, setUpvotes] = useState(translation.upvotes)
  const [downvotes, setDownvotes] = useState(translation.downvotes)

  const upvote = async () => {
    const temp = {
      upvotes, downvotes
    }
    if(translation.upvotes > upvotes)
      setUpvotes(translation.upvotes)
    else {
      setUpvotes(upvotes+1)
      setDownvotes(translation.downvotes)
    }

    try {
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URI + "/translation/"+translation.id+"/upvote",
        {
          user: 1
        },
      );
    } catch (error) {
      setDownvotes(temp.downvotes)
      setUpvotes(temp.upvotes)
    }
  }

  const downvote = async () => {
    const temp = {
      upvotes, downvotes
    }
    if (translation.downvotes > downvotes)
      setDownvotes(translation.downvotes)
    else{
      setDownvotes(downvotes + 1)
      setUpvotes(translation.upvotes)
    }

    try {
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URI + "/translation/" + translation.id + "/downvote",
        {
          user: 1
        },
      );
    } catch (error) {
      setDownvotes(temp.downvotes)
      setUpvotes(temp.upvotes)
    }
  }
  
  return (
    <div className="translation flex flex-col gap-3 rounded border border-black/10 px-4 pb-3 pt-3 ">
      <p onClick={() => setTranslation(translation.text)} className="z-0 h-fit cursor-pointer flex whitespace-pre-wrap text-2xl/8 text-tertiary group">
        {translation.text} <i className="group-hover:inline-block my-2 hidden">
          <ArrowUpRight size={16} />
        </i>
      </p>
      <div className="flex items-center justify-between">
        <div></div>

        <div className="flex gap-3">
          <button onClick={upvote} className="btn btn-ghost btn-sm flex items-center gap-2 rounded-xl text-[10px] font-medium text-tertiary">
            <ThumbsUp size={14} />
            {upvotes}
          </button>
          <button onClick={downvote} className="btn btn-ghost btn-sm flex items-center gap-2 rounded-xl text-[10px] font-medium text-tertiary">
            <ThumbsDown size={14} />
            {downvotes}
          </button>

          <div className="flex items-center gap-2 text-lg font-semibold text-tertiary">
            <Icon path={mdiDiamond} size={1} />
            16
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle btn-ghost btn-xs text-info"
              >
                <svg
                  tabIndex={0}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div
                tabIndex={0}
                className="card dropdown-content compact z-[1] w-64 rounded-box border border-black bg-white shadow"
              >
                <div tabIndex={0} className="card-body">
                  <h2 className="card-title">You needed more info?</h2>
                  <p>Here is a description!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationCard;
