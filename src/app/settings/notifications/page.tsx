import React from "react";
import { auth } from "@/auth";
import { getLanguages } from "@/actions/language";
import UpdatesForm from "./UpdatesForm";
import TrackCorpusText from "./TrackCorpusText";
import TrackLanguage from "./TrackLanguage";
import TrackTranslations from "./TrackTranslations";
import { redirect } from "next/navigation";
import { getSettings, getUpdateSetting } from "@/actions/settings";

const NotificationsPage = async () => {
  const session = await auth();
  const languages = await getLanguages();
  if (!session.user) redirect("/");
  const updateSettings = await getUpdateSetting(session.user.email);
  const settings = await getSettings(session.user.email, 1);
  const languageSettings = settings.filter(
    x => x.type === "notifications" && x.value === "language",
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
      <TrackCorpusText languages={languages} />
      <TrackTranslations languages={languages} />
    </div>
  );
};

export default NotificationsPage;
