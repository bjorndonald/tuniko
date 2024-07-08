import React from "react";
import Options from "./Options";

import Input from "./Input";
import Language from "@/types/language";
import { getLanguages } from "@/actions/language";

const RequestPage = async () => {
  const languages: Language[] = await getLanguages();
  return (
    <main className="min-h-screen w-screen py-[65px]">
      <div className="container mx-auto px-4 transition-all tablet-md:max-w-[635px] tablet-md:px-12">
        <Options languages={languages} />
        <Input languages={languages} />
      </div>
    </main>
  );
};

export default RequestPage;
