"use client";
import { isValueTracked, postSetting } from "@/actions/settings";
import Language from "@/types/language";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TrackLanguage = ({ language }: { language: Language }) => {
  const session = useSession();
  const [show, setShow] = useState(false);
  const trackLanguage = async e => {
    e.preventDefault();
    try {
      toast.loading("Loading...", { id: "loading" });
      await postSetting(session.data.user.email, "language", [
        {
          action: "translate",
          actor: session.data.user.email,
          type: "notification",
          value: "language",
          value_id: language.id,
        },
        {
          action: "insert",
          actor: session.data.user.email,
          type: "notification",
          value: "language",
          value_id: language.id,
        },
      ]);
      toast.remove("loading");
      toast.success("Setting saved.");
    } catch (error) {
      toast.remove("loading");
      toast.error("Failed to save data");
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const isTracked = await isValueTracked(
          language.id,
          session.data.user.email,
          "language",
        );
        setShow(!isTracked);
      } catch (error) {}
    };
    init();

    return () => {
      setShow(false);
    };
  }, []);

  return (
    <>
      {show && (
        <button onClick={trackLanguage} className="btn btn-outline btn-primary">
          Track {language.name} language
        </button>
      )}
    </>
  );
};

export default TrackLanguage;
