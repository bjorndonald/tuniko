"use client";
import { isValueTracked, postSetting } from "@/actions/settings";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TrackCorpusText = ({ corpusId }: { corpusId: string }) => {
  const session = useSession();
  const [show, setShow] = useState(false);
  const trackCorpus = async e => {
    e.preventDefault();
    try {
      toast.loading("Loading...", { id: "loading" });
      await postSetting(session.data.user.email, "corpus", [
        {
          action: "translate",
          actor: session.data.user.email,
          type: "notification",
          value: "corpus",
          value_id: corpusId,
        },
        {
          action: "update",
          actor: session.data.user.email,
          type: "notification",
          value: "corpus",
          value_id: corpusId,
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
          corpusId,
          session.data.user.email,
          "corpus",
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
        <button onClick={trackCorpus} className="btn btn-outline btn-primary">
          Track Corpus
        </button>
      )}
    </>
  );
};

export default TrackCorpusText;
