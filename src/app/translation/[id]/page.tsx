import React from "react";
import Options from "./Options";
import Languages from "./Languages";
import Inputs from "./Inputs";
import TranslationFilters from "./TranslationFilters";
import Translations from "./Translations";
import { getCorpusById } from "@/actions/corpus";
import CorpusText from "@/types/corpustext";
import Language from "@/types/language";
import { getLanguages } from "@/actions/language";
import { getTranslationsByCorpusId } from "@/actions/translation";
import Translation from "@/types/translation";

interface Props {
  params: { id: string };
}

const TranslationPage = async ({ params: { id } }: Props) => {
  const corpus: CorpusText = await getCorpusById(parseInt(id));
  const translations: Translation[] = await getTranslationsByCorpusId(parseInt(id));
  
  const languages: Language[] = await getLanguages();
  return (
    <main className="min-h-screen py-[65px]">
      <div className="container mx-auto w-auto max-w-[1376px] px-12 transition-all">
        <Options />

        <Languages corpus={corpus} />
        <Inputs corpusText={corpus} languages={languages} />
        <TranslationFilters />
        <Translations translations={translations} />
      </div>
    </main>
  );
};

export default TranslationPage;
