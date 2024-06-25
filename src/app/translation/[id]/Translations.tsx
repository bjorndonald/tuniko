"use client";
import React, { useEffect } from "react";
import TranslationCard from "./TranslationCard";
import { Pagination } from "@/components/Common/Pagination";
import Translation from "@/types/translation";
import { useRouter, useSearchParams } from "next/navigation";
import EmptyGraphic from "@/components/Shared/empty";
import NoResults from "@/components/Shared/no-result";
import useTranslationStore from "@/store/translation";
import { getChosen } from "@/actions/corpus";

interface Props {
  translations: Translation[];
  corpusId: string;
  owner: string;
}

const Translations = ({ translations, owner, corpusId }: Props) => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const sortType = searchParams.get("sort_type");
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  const resetChosen = useTranslationStore(s => s.resetChosen);
  const setChosen = useTranslationStore(s => s.setChosen);

  useEffect(() => {
    const init = async () => {
      const chosen = await getChosen(corpusId);
      setChosen(chosen.id);
    };
    init();
    return () => {
      resetChosen();
    };
  }, []);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-2">
      {!!translations.length && (
        <>
          {translations?.map((x, i) => (
            <TranslationCard
              owner={owner}
              corpusId={corpusId}
              key={i}
              translation={x}
            />
          ))}
        </>
      )}

      {!translations.length && !search && (
        <div className="flex flex-col items-center justify-center gap-5 py-4 tablet-md:py-10 [&>svg]:w-30 tablet-md:[&>svg]:w-60">
          <EmptyGraphic />
          <h1 className="text-lg text-base-content tablet-md:text-2xl">
            No translations available
          </h1>
        </div>
      )}

      {!translations.length && !!search && (
        <div className="flex flex-col items-center justify-center gap-5 py-4 tablet-md:py-10 [&>svg]:w-30 tablet-md:[&>svg]:w-60">
          <NoResults />
          <h1 className="text-lg text-base-content tablet-md:text-2xl">
            No search results found
          </h1>
        </div>
      )}

      {translations.length > 5 && (
        <Pagination
          totalCount={translations.length}
          currentPage={page}
          pageSize={10}
          onPageChange={p =>
            navigate.push(
              `/translations/${corpusId}?page=${p}&sort_type=${sortType}&search=${search}`,
            )
          }
        />
      )}
    </div>
  );
};

export default Translations;
