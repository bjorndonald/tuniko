"use client";
import React from "react";
import CorpusCard from "./CorpusCard";
import CorpusText from "@/types/corpustext";
import useCorpus from "@/store/corpus";
import ShareModal from "@/components/Shared/ShareModal";
import { useRouter, useSearchParams } from "next/navigation";
import EmptyGraphic from "@/components/Shared/empty";
import NoResults from "@/components/Shared/no-result";
import cx from "@/utils/cx";

interface Props {
  corpusList: CorpusText[];
}

const CorpusGrid = ({ corpusList }: Props) => {
  const navigate = useRouter();
  const shareModal = useCorpus(s => s.shareModal);
  const searchParams = useSearchParams();
  const search = searchParams.get("search")??"";
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const sortType = searchParams.get("sort_type")??"";
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;

  return (
    <div className="flex flex-col gap-4 pb-12">
      {!!corpusList.length && (
        <div
          id="corpus"
          className="lg:gap-6 relative grid w-full grid-cols-1 gap-x-4 gap-y-4 pt-4 tablet-md:grid-cols-2 desktop-lg:grid-cols-3"
        >
          {!!shareModal && <ShareModal />}
          <div className="width-ref absolute -z-20 min-h-[166px] w-full tablet-md:w-[calc((100%-17px)/2)] desktop-lg:w-[406px]"></div>
          {corpusList.map((x, i) => (
            <CorpusCard key={i} corpus={x} />
          ))}
        </div>
      )}
      {!corpusList.length && !search && (
        <div className="flex flex-col items-center justify-center gap-5 py-14 [&>svg]:w-32 tablet-md:[&>svg]:w-96">
          <h1 className="text-xl text-base-content tablet-md:text-4xl">
            No corpus available
          </h1>
          <EmptyGraphic />
        </div>
      )}

      {!corpusList.length && !!search && (
        <div className="flex flex-col items-center justify-center gap-5 py-14 [&>svg]:w-32 tablet-md:[&>svg]:w-96">
          <h1 className="text-xl text-base-content tablet-md:text-4xl">
            No search results found
          </h1>
          <NoResults />
        </div>
      )}
      <button
        onClick={() => {
          navigate.push(
            `/?page=${page + 1}&sort_type=${sortType}&search=${search}&from=${from ?? ""}&to=${to ?? ""}`,
          );
        }}
        className={cx("btn btn-outline ")}
      >
        Next
      </button>
    </div>
  );
};

export default CorpusGrid;
