import React from "react";
import Options from "./Options";

import Input from "./Input";
import Language from "@/types/language";
import { getLanguages } from "@/actions/language";

const RequestPage = async () => {
  const languages: Language[] = await getLanguages();
  return (
    <main className="min-h-screen w-screen py-[65px]">
      <div className="container mx-auto px-4 tablet-md:max-w-[635px] tablet-md:px-12 transition-all">
        <Options languages={languages} />
        <Input />
      </div>
    </main>
  );
};

export default RequestPage;
