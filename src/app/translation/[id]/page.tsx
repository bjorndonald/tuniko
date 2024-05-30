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
import { getTranslationsByCorpusId, getVoteOfTranslation } from "@/actions/translation";
import Translation, { Vote } from "@/types/translation";
import { auth } from "@/auth";
import { ANONYMOUS_USER_EMAIL } from "@/constants/strings";

interface Props {
  params: { id: string };
}


const TranslationPage = async ({ params: { id } }: Props) => {
  const corpus: CorpusText = await getCorpusById(id);
  const translations: Translation[] = await getTranslationsByCorpusId(
    id,
  );
  const languages: Language[] = await getLanguages();
  
  return (
    <main className="min-h-screen py-[65px]">
      <div className=" mx-auto w-full tablet-md:w-auto tablet-md:max-w-[1376px] px-4 tablet-md:px-12 transition-all">
        <Options />

        <Languages languages={languages} corpus={corpus} />
        <Inputs corpusText={corpus} languages={languages} />
        <TranslationFilters />
        <Translations translations={translations} />
      </div>
    </main>
  );
};

export default TranslationPage;
