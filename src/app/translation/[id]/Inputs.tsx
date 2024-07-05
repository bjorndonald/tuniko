"use client";
import cx from "classnames";
import { EfikTextArea, EnglishTextArea } from "@/components/Common/Language";
import useLanguageStore from "@/store/language";
import CorpusText from "@/types/corpustext";
import Language from "@/types/language";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle,
  Copy,
  RefreshCw,
  Share,
  X,
} from "react-feather";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ANONYMOUS_USER_EMAIL, ENGLISH_LANGUAGE_ID } from "@/constants/strings";
import { useSession } from "next-auth/react";
import Translation from "@/types/translation";
import { getChosen } from "@/actions/corpus";
import { doCopyText } from "@/utils/copy";
import { postSetting } from "@/actions/settings";

interface Props {
  corpusText: CorpusText;
  languages: Language[];
}

const leftSchema = z.object({
  translation: z.string(),
});

const rightSchema = z.object({
  corpus: z.string(),
});

type LeftFormData = z.infer<typeof leftSchema>;
type RightFormData = z.infer<typeof rightSchema>;

const Inputs = ({ corpusText }: Props) => {
  const navigate = useRouter();
  const session = useSession();
  const [chosen, setChosen] = useState<Translation>();
  const [loading, setLoading] = useState(false);
  const isEditing = useLanguageStore(s => s.isEditing);
  const setIsEditing = useLanguageStore(s => s.setIsEditing);
  const setCorpus = useLanguageStore(s => s.setCorpus);
  const corpus = useLanguageStore(s => s.corpus);
  const translation = useLanguageStore(s => s.translation);
  const setTranslation = useLanguageStore(s => s.setTranslation);
  const languageFrom = useLanguageStore(s => s.languageFrom);
  const languageTo = useLanguageStore(s => s.languageTo);

  const { handleSubmit: handleLeftSubmit, setValue: setLeftValue } =
    useForm<LeftFormData>({
      resolver: zodResolver(leftSchema),
    });
  const { handleSubmit: handleRightSubmit, setValue: setRightValue } =
    useForm<RightFormData>({
      resolver: zodResolver(rightSchema),
    });

  useEffect(() => {
    setCorpus(corpusText.text);
    const init = async () => {
      try {
        const chosen: Translation = await getChosen(corpusText.id);
        setChosen(chosen);
      } catch (error) {}
    };
    init();
    return () => {
      setTranslation("");
    };
  }, []);

  useEffect(() => {
    setLeftValue("translation", translation);

    return () => {};
  }, [translation]);

  const saveTranslation = async () => {
    toast.loading("Loading...", {
      id: "loading",
      duration: 2000,
    });
    setLoading(true);

    try {
      await axios.post(process.env.NEXT_PUBLIC_SERVER_URI + "/translation", {
        text: translation.trim(),
        translator: {
          email:
            session.status === "authenticated"
              ? session.data.user.email
              : ANONYMOUS_USER_EMAIL,
        },
        corpus: corpusText.id,
        language_id: languageTo,
      });
      toast.remove("loading");
      toast.success("Saved");
      setLoading(false);
      setTranslation("");
      navigate.refresh();
    } catch (error) {
      toast.remove("loading");
      setLoading(false);

      if (error instanceof AxiosError) {
        if (error.response.status === 403) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Error");
        }
      } else {
        toast.error("Error");
      }
    }
  };

  const createCorpus = async () => {
    toast.loading("Loading...", {
      id: "loading",
      duration: 2000,
    });
    setLoading(true);

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URI + "/corpus",
        {
          text: corpus,
          owner: {
            email:
              session.status === "authenticated"
                ? session.data.user.email
                : ANONYMOUS_USER_EMAIL,
          },
          entry_type: corpusText.entry_type,
          language_from_id: languageFrom,
          language_to_id: languageTo,
        },
      );
      toast.remove("loading");
      toast.success("Saved");
      setLoading(false);

      navigate.push("/translation/" + res.data.id);
    } catch (error) {
      toast.remove("loading");
      toast.error("Error");
      setLoading(false);
    }
  };

  const saveCorpus = async () => {
    toast.loading("Loading...", {
      id: "loading",
      duration: 2000,
    });
    setLoading(true);

    try {
      const res = await axios.put(
        process.env.NEXT_PUBLIC_SERVER_URI + "/corpus",
        {
          id: corpusText.id,
          text: corpus,
          owner: {
            email:
              session.status === "authenticated"
                ? session.data.user.email
                : ANONYMOUS_USER_EMAIL,
          },
          entry_type: corpusText.entry_type,
          language_from_id: languageFrom,
          language_to_id: languageTo,
        },
      );
      toast.remove("loading");
      toast.success("Saved");
      setLoading(false);
      navigate.push("/translation/" + res.data.id);
    } catch (error) {
      toast.remove("loading");
      toast.error("Error");
      setLoading(false);
    }
  };

  const trackCorpus = async e => {
    e.preventDefault();
    try {
      toast.loading("Loading...", { id: "loading" });
      await postSetting(session.data.user.email, "corpus", [
        {
        action: "translate",
        actor: session.data.user.email,
        type: "notification",
        value: "corpus",
        value_id: corpusText.id,
      },
        {
          action: "update",
          actor: session.data.user.email,
          type: "notification",
          value: "corpus",
          value_id: corpusText.id,
        },  
    ]);
      toast.remove("loading");
      toast.success("Setting saved.");
    } catch (error) {
      toast.remove("loading");
      toast.error("Failed to save data");
    }
  };

  const trackLanguageFrom = async e => {
    e.preventDefault();
    try {
      toast.loading("Loading...", { id: "loading" });
      await postSetting(session.data.user.email, "language", [
        {
          action: "translate",
          actor: session.data.user.email,
          type: "notification",
          value: "language",
          value_id: corpusText.language_from.id,
        },
        {
          action: "insert",
          actor: session.data.user.email,
          type: "notification",
          value: "language",
          value_id: corpusText.language_from.id,
        },
      ]);
      toast.remove("loading");
      toast.success("Setting saved.");
    } catch (error) {
      toast.remove("loading");
      toast.error("Failed to save data");
    }
  };

  const trackLanguageTo = async e => {
    e.preventDefault();
    try {
      toast.loading("Loading...", { id: "loading" });
      await postSetting(session.data.user.email, "language", [
        {
          action: "translate",
          actor: session.data.user.email,
          type: "notification",
          value: "language",
          value_id: corpusText.language_to.id,
        },
        {
          action: "insert",
          actor: session.data.user.email,
          type: "notification",
          value: "language",
          value_id: corpusText.language_to.id,
        },
      ]);
      toast.remove("loading");
      toast.success("Setting saved.");
    } catch (error) {
      toast.remove("loading");
      toast.error("Failed to save data");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-1 flex-col flex-nowrap gap-2 tablet-md:flex-row">
        {loading && <></>}
        <form
          onSubmit={handleLeftSubmit(saveTranslation)}
          className="rounded-lg relative flex min-h-[166px] grow flex-col justify-between border border-base-300"
        >
          {!!corpus.length && (
            <button className="btn btn-circle btn-ghost absolute right-2 top-2 h-10 !min-h-10 w-10 rounded-full">
              <X width={24} height={24} color="rgb(95,99,104)" />
            </button>
          )}

          <div className="flex w-full pl-4 pr-[52px] pt-3">
            {languageTo !== ENGLISH_LANGUAGE_ID ? (
              <EfikTextArea
                value={translation}
                setValue={str => {
                  setTranslation(str);
                  setLeftValue("translation", str);
                }}
                id="translation"
              />
            ) : (
              <EnglishTextArea
                value={translation}
                setValue={str => {
                  setTranslation(str);
                  setLeftValue("translation", str);
                }}
                id="translation"
              />
            )}
          </div>
          <div className="flex items-center justify-between px-4">
            <button
              type="submit"
              className="btn btn-ghost my-2 text-sm uppercase text-primary"
            >
              Save Translation
            </button>
            <span className="text-xs/[27px] text-[rgb(60,64,67)]">
              {translation.length} / 300
            </span>
          </div>
        </form>

        <form
          onSubmit={handleRightSubmit(saveCorpus)}
          className="rounded-lg bg-toolbar relative flex grow flex-col justify-between border border-base-300"
        >
          <button
            onClick={() => {
              doCopyText(corpus);
              toast.success("Copied.");
            }}
            className="btn btn-circle btn-ghost absolute right-2 top-2 h-10 !min-h-10 w-10 rounded-full"
          >
            <Copy width={24} height={24} color="rgb(95,99,104)" />
          </button>

          <div className="flex pl-4 pr-[52px] pt-3">
            {languageTo !== ENGLISH_LANGUAGE_ID ? (
              <EfikTextArea
                disabled={!isEditing}
                value={corpus}
                setValue={str => {
                  setCorpus(str);
                  setRightValue("corpus", str);
                }}
                id="corpus"
              />
            ) : (
              <EnglishTextArea
                disabled={!isEditing}
                value={corpus}
                setValue={str => {
                  setCorpus(str);
                  setRightValue("corpus", str);
                }}
                id="corpus"
              />
            )}
          </div>
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              {isEditing && (
                <button className="btn btn-circle btn-ghost my-2 h-10 !min-h-10 w-10 rounded-full p-2">
                  <RefreshCw width={16} height={16} color="rgb(95,99,104)" />
                </button>
              )}
              <span className="text-xs/[27px] text-[rgb(60,64,67)]">
                {corpus.length} / 300
              </span>
            </div>

            <div className="flex items-center">
              <button className="btn btn-circle btn-ghost my-2 h-10 !min-h-10 w-10 rounded-full p-2">
                <Share color="rgb(95,99,104)" />
              </button>
              {corpusText.owner.email !== session.data.user.email && isEditing && (
                <button
                  onSubmit={handleRightSubmit(createCorpus)}
                  disabled={corpusText.text === corpus}
                  className={cx(
                    "btn btn-ghost my-2 text-sm uppercase text-primary",
                    corpusText.text === corpus && " !text-black/50",
                  )}
                >
                  Make Corpus
                </button>
              )}

              {corpusText.owner.email === session.data.user.email && isEditing && (
                <button
                onSubmit={handleRightSubmit(saveCorpus)}
                  disabled={corpusText.text === corpus}
                  className={cx(
                    "btn btn-ghost my-2 text-sm uppercase text-primary",
                    corpusText.text === corpus && " !text-black/50",
                  )}
                >
                  Save Corpus
                </button>
              )}

              { !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-ghost my-2 text-sm uppercase"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      
        <div className="flex w-full gap-2">
          <div className="tablet-md:w-[calc(50%)] flex gap-3">
            <button onClick={trackCorpus} className="btn btn-outline btn-primary">
              Track Corpus
            </button>
          <button onClick={trackLanguageFrom} className="btn btn-outline btn-primary">
            Track {corpusText.language_from.name} language
          </button>
          <button onClick={trackLanguageTo} className="btn btn-outline btn-primary">
            Track {corpusText.language_to.name} language
          </button>
          </div>
        {!!chosen && (
          <div className="translation rounded flex w-full gap-3 border border-base-300 bg-primary/5 px-4 pb-3 pt-3 tablet-md:w-[calc(50%)] ">
            <p
              onClick={() => setTranslation(chosen.text)}
              className="text-tertiary-tx group z-0 flex h-fit grow cursor-pointer whitespace-pre-wrap text-2xl/8"
            >
              {chosen.text}{" "}
              <i className="my-2 hidden group-hover:inline-block">
                <ArrowUpRight size={16} />
              </i>
            </p>
            <i className="text-primary">
              <CheckCircle />
            </i>
          </div>
        )}
        </div>
     
    </div>
  );
};

export default Inputs;
