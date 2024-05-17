"use client";
import React, { useEffect } from "react";
import Masonry from "masonry-layout";
import CorpusCard from "./CorpusCard";
import { CollectionCard } from "../Collection";

const CorpusGrid = () => {
  useEffect(() => {
    const grid = document.querySelector("#corpus");
    new Masonry(grid, {
      // set itemSelector so .grid-sizer is not used in layout
      itemSelector: ".corpus",
      gutter: 20,

      // use element for option
      columnWidth: ".corpus",
      percentPosition: true,
    });

    return () => {};
  }, []);

  return (
    <div id="corpus" className="pt-4 lg:grid lg:grid-cols-3 lg:gap-6">
      <CorpusCard />
      <CorpusCard />
      <CorpusCard />
      <CorpusCard />
      <CorpusCard />
      <CorpusCard />
      <CorpusCard />
      <CollectionCard />
    </div>
  );
};

export default CorpusGrid;
