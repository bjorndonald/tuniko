"use client";
import React, { useEffect } from "react";
import CorpusCard from "./CorpusCard";
import CorpusText from "@/types/corpustext";

interface Props {
  corpusList: CorpusText[];
}

const CorpusGrid = ({ corpusList }: Props) => {
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
    <div
      id="corpus"
      className="lg:gap-6 relative grid w-full grid-cols-1 gap-x-4 gap-y-4 pt-4 tablet-md:grid-cols-2 desktop-lg:grid-cols-3"
    >
      <div className="width-ref absolute -z-20 min-h-[166px] w-full tablet-md:w-[calc((100%-17px)/2)] desktop-lg:w-[406px]"></div>
      {corpusList.map((x, i) => (
        <CorpusCard key={i} corpus={x} />
      ))}
    </div>
  );
};

export default CorpusGrid;
