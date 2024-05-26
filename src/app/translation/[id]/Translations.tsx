"use client";
import React, { useState } from "react";
import TranslationCard from "./TranslationCard";
import { Pagination } from "@/components/Common/Pagination";
import Translation from "@/types/translation";

interface Props {
  translations: Translation[]
}

const Translations = ({translations}: Props) => {
  const [page, setPage] = useState(1);
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      {translations?.map((x, i)=> (
        <TranslationCard key={i} translation={x} />
      ))}
      <Pagination
        pageSize={4}
        currentPage={page}
        onPageChange={setPage}
        totalCount={translations?.length??0}
      />
    </div>
  );
};

export default Translations;
