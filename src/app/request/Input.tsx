"use client";
import React, { useState } from "react";
import { X } from "react-feather";
import EfikTextArea from "../../components/Common/Language/EfikTextArea";
import axios from "axios";
import toast from "react-hot-toast";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loading as loadingIcon } from "@/components/icons";
import Icon from "@mdi/react";
import cx from "classnames";
import useLanguageStore from "@/store/language";
import { ENGLISH_LANGUAGE_ID } from "@/constants/languages";
import { EnglishTextArea } from "@/components/Common/Language";

const schema = z.object({
  text: z.string(),
});

type FormData = z.infer<typeof schema>;

const Input = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [corpus, setCorpus] = useState("");
  const languageFrom = useLanguageStore(s => s.languageFrom);
  const languageTo = useLanguageStore(s => s.languageTo);
  const { handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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
    <form
      onSubmit={handleSubmit(saveCorpus)}
      className="relative flex min-h-[166px] grow flex-col justify-between rounded-lg border border-black/[0.12]"
    >
      {!!corpus.length && (
        <button
          onClick={() => setCorpus("")}
          className="btn btn-circle btn-ghost absolute right-2 top-2 h-10 !min-h-10 w-10 rounded-full"
        >
          <X width={24} height={24} color="rgb(95,99,104)" />
        </button>
      )}

      <div className="flex w-full pl-4 pr-[52px] pt-3">
        {languageFrom === ENGLISH_LANGUAGE_ID ? (
          <EnglishTextArea
            value={corpus}
            setValue={str => {
              setCorpus(str);
              setValue("text", str);
            }}
            id="corpus"
          />
        ) : (
          <EfikTextArea
            value={corpus}
            setValue={str => {
              setCorpus(str);
              setValue("text", str);
            }}
            id="corpus"
          />
        )}
      </div>
      <div className="flex items-center justify-between px-4">
        <button
          type="submit"
          disabled={!corpus.length}
          className={cx(
            "btn btn-ghost my-2 flex gap-2 text-sm uppercase text-primary",
            !corpus.length && "!text-black/75",
          )}
        >
          Save Corpus{" "}
          {loading && (
            <Icon
              path={loadingIcon}
              className={cx("size-5", loading && "animate-spin")}
            />
          )}
        </button>
        <span className="text-xs/[27px] text-[rgb(60,64,67)]">
          {corpus.length} / 300
        </span>
      </div>
    </form>
  );
};

export default Input;
