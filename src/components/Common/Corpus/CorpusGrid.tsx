"use client";
import React, { useEffect } from "react";
import Masonry from "masonry-layout";
import CorpusCard from "./CorpusCard";
import CorpusText from "@/types/corpustext";

interface Props {
  corpusList: CorpusText[]
}

const CorpusGrid = ({corpusList}: Props) => {
  useEffect(() => {
    const grid = document.querySelector("#corpus");
    if (typeof window !== "undefined") {
      new Masonry(grid, {
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: ".corpus",
        gutter: 16,
        transitionDuration: '0.01s',
        // use element for option
        columnWidth: ".width-ref",
        horizontalOrder: true,
        percentPosition: false
      });
    }
    
    return () => {};
  }, []);
console.log(corpusList)
  return (
    <div id="corpus" className="w-full gap-x-4 gap-y-4 relative pt-4 grid grid-cols-1 tablet-md:grid-cols-2 desktop-lg:grid-cols-3 lg:gap-6">
      <div className="min-h-[166px] width-ref desktop-lg:w-[406px] tablet-md:w-[calc((100%-17px)/2)] w-full absolute -z-20"></div>
      {corpusList.map((x, i) => (
        <CorpusCard key={i} corpus={x} />
      ))}
    </div>
  );
};

export default CorpusGrid;
