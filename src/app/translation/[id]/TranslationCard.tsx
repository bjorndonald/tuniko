"use client";
import React, { useEffect, useState } from "react";
import {
  ThumbsDown,
  ThumbsUp,
  ArrowUpRight,
  MoreVertical,
  Check,
  Clock,
} from "react-feather";
import { mdiDiamond } from "@mdi/js";
import Icon from "@mdi/react";
import Translation, { Vote } from "@/types/translation";
import useLanguageStore from "@/store/language";
import axios from "axios";
import { ANONYMOUS_USER_EMAIL } from "@/constants/strings";
import { useSession } from "next-auth/react";
import cx from "@/utils/cx";
import {
  TranslationIsChosen,
  getVoteOfTranslation,
} from "@/actions/translation";
import moment from "moment";
import $ from "jquery";
import toast from "react-hot-toast";
import { chooseTranslation, unchooseTranslation } from "@/actions/corpus";
import { useRouter } from "next/navigation";
import { doCopyText } from "@/utils/copy";
interface Props {
  translation: Translation;
  corpusId: string;
  owner: string;
}

const TranslationCard = ({ translation, owner, corpusId }: Props) => {
  const navigate = useRouter();
  const session = useSession();
  const [isChosen, setIsChosen] = useState();
  const setTranslation = useLanguageStore(s => s.setTranslation);
  const [upvotes, setUpvotes] = useState(translation.upvotes);
  const [downvotes, setDownvotes] = useState(translation.downvotes);
  const [vote, setVote] = useState<Vote>();
  const [defaultVote, setDefaultVote] = useState();
console.log(owner, session.data.user.email)
  useEffect(() => {
    const init = async () => {
      const vote =
        session.status === "authenticated"
          ? await getVoteOfTranslation(translation.id, session.data.user.email)
          : "none";
      const isChosen = await TranslationIsChosen(translation.id);
      setIsChosen(isChosen);
      setVote(vote);
      setDefaultVote(vote);
    };

    init();

    return () => {};
  }, []);

  const upvote = async () => {
    if (vote === "upvote") {
      setUpvotes(upvotes - 1);
      setVote("none");
    } else {
      setUpvotes(upvotes + 1);
      setDownvotes(translation.downvotes);
      setVote("upvote");
    }

    try {
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URI +
          "/translation/" +
          translation.id +
          "/upvote",
        {
          email:
            session.status === "authenticated"
              ? session.data.user.email
              : ANONYMOUS_USER_EMAIL,
        },
      );
    } catch (error) {
      setUpvotes(translation.upvotes);
      setVote(defaultVote);
    }
  };

  const downvote = async () => {
    if (vote === "downvote") {
      setDownvotes(downvotes - 1);
      setVote("none");
    } else {
      setDownvotes(downvotes + 1);
      setUpvotes(translation.upvotes);
      setVote("downvote");
    }
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URI +
          "/translation/" +
          translation.id +
          "/downvote",
        {
          email:
            session.status === "authenticated"
              ? session.data.user.email
              : ANONYMOUS_USER_EMAIL,
        },
      );
    } catch (error) {
      setDownvotes(translation.downvotes);
      setVote(defaultVote);
    }
  };

  const choose = async () => {
    toast.loading("Choosing", { id: "loading" });
    try {
      await chooseTranslation(corpusId, translation.id);
      toast.success("Chosen");
      toast.remove("loading");
      navigate.refresh();
    } catch (error) {
      toast.error("Not done");
      toast.remove("loading");
    }
  };

  const unchoose = async () => {
    toast.loading("Removing choice", { id: "loading" });
    try {
      await unchooseTranslation(corpusId, translation.id);
      toast.success("Done");
      toast.remove("loading");
      navigate.refresh();
    } catch (error) {
      toast.error("Not done");
      toast.remove("loading");
    }
  };
  const closeMenu = () => {
    $(".dropdown").removeClass("dropdown-open");
    const active = document.activeElement as HTMLElement;
    active.blur();
  };
  return (
    <div
      className={cx(
        "translation rounded flex flex-col gap-3 border border-divider px-4 pb-3 pt-3 ",
        isChosen && "bg-primary/5",
      )}
    >
      <div className="flex w-full grow">
        <p
          onClick={() => setTranslation(translation.text)}
          className="text-tertiary-tx group z-0 flex h-fit grow cursor-pointer whitespace-pre-wrap text-2xl/8"
        >
          {translation.text}{" "}
          <i className="my-2 hidden group-hover:inline-block">
            <ArrowUpRight size={16} />
          </i>
        </p>
        <div className="flex h-fit items-center gap-2 pl-3">
          <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-background p-1 pr-2 text-[10px] text-tertiary-txt">
            <Clock size={12} />
            {moment
              .duration(moment().diff(moment(translation.created_at)))
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
                <a
                  onClick={e => {
                    setTranslation(translation.text);
                    closeMenu();
                    e.stopPropagation();
                  }}
                >
                  Use
                </a>
              </li>
              {session.data?.user?.email === owner && (
                <li>
                  <a
                    onClick={e => {
                      if(isChosen) unchoose()
                      else choose();
                      closeMenu();
                      navigate.refresh()
                      e.stopPropagation();
                    }}
                  >
                    {isChosen?'Remove choice':'Choose'}
                  </a>
                </li>
              )}

              <li>
                <a
                  onClick={e => {
                    doCopyText(translation.text);
                    toast.success("Copied.");
                    closeMenu();
                    e.stopPropagation();
                  }}
                >
                  Copy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div></div>

        <div className="flex items-center gap-3">
          {isChosen && (
            <div className="rounded-3xl flex h-6 items-center gap-1 border-primary bg-primary/15 px-1.5 py-0.5 text-[10px] text-primary">
              <Check size={12} color="rgb(25,103,210)" />
              Chosen
            </div>
          )}
          {vote && (
            <button
              onClick={upvote}
              className={cx(
                "rounded-xl btn btn-sm flex items-center gap-2 text-[10px] font-medium ",
                vote === "upvote"
                  ? "btn-primary text-light"
                  : "btn-ghost text-tertiary-txt",
              )}
            >
              <ThumbsUp size={14} />
              {upvotes}
            </button>
          )}
          {!vote && <div className="skeleton h-8 w-14 rounded-2"></div>}

          {vote && (
            <button
              onClick={downvote}
              className={cx(
                "rounded-xl btn btn-sm flex items-center gap-2 text-[10px] font-medium ",
                vote === "downvote"
                  ? "btn-primary text-light"
                  : "btn-ghost text-tertiary-txt",
              )}
            >
              <ThumbsDown size={14} />
              {downvotes}
            </button>
          )}
          {!vote && <div className="skeleton h-8 w-14 rounded-2"></div>}

          <div className="flex items-center gap-2 text-lg font-semibold text-tertiary">
            <Icon path={mdiDiamond} size={1} />
            {translation.score}
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
