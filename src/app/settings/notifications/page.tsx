import React from "react";
import { auth } from "@/auth";
import { getLanguages } from "@/actions/language";
import UpdatesForm from "./UpdatesForm";
import TrackCorpusText from "./TrackCorpusText";
import TrackLanguage from "./TrackLanguage";
import TrackTranslations from "./TrackTranslations";
import { redirect } from "next/navigation";
import {
  getCorpusSettings,
  getLanguageSettings,
  getTranslationSettings,
  getUpdateSetting,
} from "@/actions/settings";

const NotificationsPage = async () => {
  const session = await auth();
  const languages = await getLanguages();
  if (!session.user) redirect("/");
  const updateSettings = await getUpdateSetting(session.user.email);
  const languageSettings = await getLanguageSettings(session.user.email, 1);
  const corpusSettings = await getCorpusSettings(session.user.email, 1);
  const translationSettings = await getTranslationSettings(
    session.user.email,
    1,
  );
  return (
    <div className="min-h-full w-full px-8 py-4">
      <div className="mb-7 flex flex-col">
        <h2 className="mb-0 text-xl font-semibold leading-7">Notification</h2>
        <p className="text-gray-600 mt-1 text-sm leading-6">
          This will decide the nature of the notifcation we send
        </p>
      </div>

      <UpdatesForm initialSetting={updateSettings} session={session} />
      <TrackLanguage
        languages={languages}
        email={session.user.email}
        languageSettings={languageSettings}
      />
      <TrackCorpusText
        corpusSettings={corpusSettings}
        email={session.user.email}
      />
      <TrackTranslations
        translationSettings={translationSettings}
        email={session.user.email}
      />
    </div>
  );
};

export default NotificationsPage;
