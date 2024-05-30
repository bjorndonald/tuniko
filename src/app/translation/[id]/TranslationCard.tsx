"use client";
import React, { useEffect, useState } from "react";
import { ThumbsDown, ThumbsUp, ArrowUpRight } from "react-feather";
import { mdiDiamond } from "@mdi/js";
import Icon from "@mdi/react";
import Translation, { Vote } from "@/types/translation";
import useLanguageStore from "@/store/language";
import axios from "axios";
import { ANONYMOUS_USER_EMAIL, ANONYMOUS_USER_ID } from "@/constants/strings";
import { useSession } from "next-auth/react";
import cx from "@/utils/cx";
import { getVoteOfTranslation } from "@/actions/translation";

interface Props {
  translation: Translation;
}

const TranslationCard = ({ translation, }: Props) => {
  const session = useSession()
  const setTranslation = useLanguageStore(s => s.setTranslation);
  const [upvotes, setUpvotes] = useState(translation.upvotes);
  const [downvotes, setDownvotes] = useState(translation.downvotes);
  const [vote, setVote] = useState<Vote>()
  const [defaultVote, setDefaultVote] = useState()

  useEffect(() => {
    const init = async () => {
      const vote = session.status === "authenticated" ? await getVoteOfTranslation(translation.id, session.data.user.email) : "none"
      setVote(vote)
      setDefaultVote(vote)
    } 

    init()
  
    return () => {
    }
  }, [])
  

  const upvote = async () => {
    if (vote === "upvote" && session.status === "authenticated"){
      setUpvotes(upvotes - 1)
      setVote("none")
    }
    else {setUpvotes(upvotes + 1)
    setVote("upvote")}
    
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URI +
          "/translation/" +
          translation.id +
          "/upvote",
        {
          email: session.status === "authenticated" ? session.data.user.email : ANONYMOUS_USER_EMAIL,
        },
      );
    } catch (error) {
      if (session.status === "authenticated") {
        setUpvotes(upvotes - 1)
      }
      setVote(defaultVote)
    }
  };

  const downvote = async () => {
    if (vote === "downvote" && session.status === "authenticated") {
      setDownvotes(downvotes - 1)
      setVote("none")
    }
    else {setDownvotes(downvotes + 1)
    setVote("downvote")}
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URI +
          "/translation/" +
          translation.id +
          "/downvote",
        {
          email: session.status === "authenticated" ? session.data.user.email : ANONYMOUS_USER_EMAIL,
        },
      );
    } catch (error) {
      if (session.status === "authenticated") {
        setDownvotes(downvotes - 1)
      }
      setVote(defaultVote)
    }
  };

  return (
    <div className="translation flex flex-col gap-3 rounded border border-black/10 px-4 pb-3 pt-3 ">
      <p
        onClick={() => setTranslation(translation.text)}
        className="group z-0 flex h-fit cursor-pointer whitespace-pre-wrap text-2xl/8 text-tertiary-tx"
      >
        {translation.text}{" "}
        <i className="my-2 hidden group-hover:inline-block">
          <ArrowUpRight size={16} />
        </i>
      </p>
      <div className="flex items-center justify-between">
        <div></div>

        <div className="flex gap-3">
          
          {vote && <button
            onClick={upvote}
            className={cx("btn btn-sm flex items-center gap-2 rounded-xl text-[10px] font-medium ",
              vote === "upvote" ? "btn-primary text-light" : "btn-ghost text-tertiary-txt"
            )}
          >
            <ThumbsUp size={14} />
            {upvotes}
          </button>}
          {!vote && <button className="skeleton rounded-2 text-[10px] h-8 w-14"></button>}
          
          {vote &&<button
            onClick={downvote}
            className={cx("btn btn-sm flex items-center gap-2 rounded-xl text-[10px] font-medium ",
              vote === "downvote" ? "btn-primary text-light" : "btn-ghost text-tertiary-txt"
            )}
          >
            <ThumbsDown size={14} />
            {downvotes}
          </button>}
          {!vote && <button className="skeleton rounded-2 text-[10px] h-8 w-14"></button>}

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
