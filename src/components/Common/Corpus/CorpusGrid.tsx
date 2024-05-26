"use client";
import React, { useEffect } from "react";
import Masonry from "masonry-layout";
import CorpusCard from "./CorpusCard";

const CorpusGrid = () => {
  useEffect(() => {
    const grid = document.querySelector("#corpus");
    new Masonry(grid, {
      // set itemSelector so .grid-sizer is not used in layout
      itemSelector: ".corpus",
      gutter: 16,
      // use element for option
      columnWidth: ".corpus",
      percentPosition: true,
    });

    return () => {};
  }, []);

  return (
    <div id="corpus" className="w-full pt-4 lg:grid lg:grid-cols-3 lg:gap-6">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((x, i) => (
        <CorpusCard key={i} corpus={{ id: `corpus${x}` }} />
      ))}
    </div>
  );
};

export default CorpusGrid;
