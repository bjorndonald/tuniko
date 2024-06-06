"use client";
import React, { useEffect } from "react";
import CorpusCard from "./CorpusCard";
import CorpusText from "@/types/corpustext";
import useCorpus from "@/store/corpus";
import ShareModal from "@/components/Shared/ShareModal";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "../Pagination";

interface Props {
  corpusList: CorpusText[];
}

const CorpusGrid = ({ corpusList }: Props) => {
  const navigate = useRouter();
  const shareModal = useCorpus(s => s.shareModal);
  const searchParams = useSearchParams();
  const sortType = searchParams.get("sort_type");
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;

  useEffect(() => {
    const init = async () => {
      const Masonry = (await import("masonry-layout")).default;
      const grid = document.querySelector("#corpus");
      if (typeof window !== "undefined") {
        new Masonry(grid, {
          itemSelector: ".corpus",
          gutter: 16,
          transitionDuration: "0.01s",
          // use element for option
          columnWidth: ".width-ref",
          horizontalOrder: true,
          percentPosition: false,
        });
      }
    };
    init();

    return () => {};
  }, []);

  return (
    <div className="flex flex-col gap-4">
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
      {corpusList.length > 10 && (
        <Pagination
          totalCount={corpusList.length}
          currentPage={page}
          pageSize={10}
          onPageChange={p =>
            navigate.push(`/?page=${page}&sort_type=${sortType}`)
          }
        />
      )}
    </div>
  );
};

export default CorpusGrid;
