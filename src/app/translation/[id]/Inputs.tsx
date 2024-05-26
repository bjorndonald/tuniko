"use client";
import cx from "classnames";
import { EfikTextArea, EnglishTextArea } from "@/components/Common/Language";
import useLanguageStore from "@/store/language";
import CorpusText from "@/types/corpustext";
import Language from "@/types/language";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Copy, RefreshCw, Share, X } from "react-feather";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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
  const [loading, setLoading] = useState(false);
  const isEditing = useLanguageStore(s => s.isEditing);
  const setIsEditing = useLanguageStore(s => s.setIsEditing);
  const setCorpus = useLanguageStore(s => s.setCorpus);
  const corpus = useLanguageStore(s => s.corpus);
  const translation = useLanguageStore(s => s.translation);
  const setTranslation = useLanguageStore(s => s.setTranslation);
  const languageFrom = useLanguageStore(s => s.languageFrom);
  const languageTo = useLanguageStore(s => s.languageTo);

  const { handleSubmit: handleLeftSubmit, setValue: setLeftValue } = useForm<LeftFormData>({
    resolver: zodResolver(leftSchema),
  });
  const { handleSubmit: handleRightSubmit, setValue: setRightValue } = useForm<RightFormData>({
    resolver: zodResolver(rightSchema),
  });

  useEffect(() => {
    setCorpus(corpusText.text);

    return () => {};
  }, []);

  const saveTranslation = async () => {
    toast.loading("Loading...", {
      id: "loading",
      duration: 2000,
    });
    setLoading(true);

    try {
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URI + "/translation",
        {
          text: translation.trim(),
          translator_id: 1,
          corpus: corpusText.id,
          language_id: languageTo,
        },
      );
      toast.remove("loading");
      toast.success("Saved");
      setLoading(false);
      setTranslation('')
      navigate.push("/translation/" + corpusText.id);
    } catch (error) {
      toast.remove("loading");
      toast.error("Error");
      setLoading(false);
      if(error instanceof AxiosError){
        if(error.status === 403){
          toast.error(error.response.data)
        }
      }
    }
  };

  const saveCorpus = async () => {
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
          owner_id: 1,
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

  return (
    <div className="flex flex-1 flex-row flex-nowrap gap-2">
      {loading && <></>}
      <form
        onSubmit={handleLeftSubmit(saveTranslation)}
        className="relative flex min-h-[166px] grow flex-col justify-between rounded-lg border border-black/[0.12]"
      >
        {!!corpus.length && (
          <button className="btn btn-circle btn-ghost absolute right-2 top-2 h-10 !min-h-10 w-10 rounded-full">
            <X width={24} height={24} color="rgb(95,99,104)" />
          </button>
        )}

        <div className="flex w-full pl-4 pr-[52px] pt-3">
          {languageTo === 1 ? (
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
          {/* <textarea value={corpus} onChange={e => setCorpus(e.target.value)} className='min-h-16 text-2xl outline-none border-none bg-transparent w-full text-[rgb(60,64,67)] whitespace-pre-wrap resize-none' aria-label='corpus' aria-autocomplete='list'
                        aria-expanded='false' autoComplete='off' autoCorrect='off' role='combobox' rows={1} spellCheck={false} name="corpus" id="corpus"></textarea> */}
        </div>
        <div className="flex items-center justify-between px-4">
          {/* {isEditingCorpus ?
                        <button className='btn my-2 btn-ghost text-sm uppercase'>
                            Save Translation
                        </button> :
                        <button className='btn my-2 btn-ghost text-sm uppercase'>
                            Edit
                        </button>
                    } */}

          <button type="submit" className="btn btn-ghost my-2 text-sm uppercase text-primary">
            Save Translation
          </button>
          <span className="text-xs/[27px] text-[rgb(60,64,67)]">
            {translation.length} / 300
          </span>
        </div>
      </form>
      <form
        onSubmit={handleRightSubmit(saveCorpus)}
        className="relative flex grow flex-col justify-between rounded-lg bg-[#f5f5f5]"
      >
        <button className="btn btn-circle btn-ghost absolute right-2 top-2 h-10 !min-h-10 w-10 rounded-full">
          <Copy width={24} height={24} color="rgb(95,99,104)" />
        </button>

        <div className="flex pl-4 pr-[52px] pt-3">
          {languageFrom === 1 ? (
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
            {isEditing && (
              <button
                disabled={corpusText.text === corpus}
                className={cx(
                  "btn btn-ghost my-2 text-sm uppercase text-primary",
                  corpusText.text === corpus && " !text-black/50",
                )}
              >
                Make Corpus
              </button>
            )}

            {!isEditing && (
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
  );
};

export default Inputs;
