"use client";
import { getCorpusFile } from "@/actions/corpus";
import React from "react";
import { Download } from "react-feather";
import toast from "react-hot-toast";
import { DownloadLink } from "./footer.styles";

const DownloadButton = () => {
  const download = async () => {
    try {
      const blob = await getCorpusFile();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        "Corpus_" + new Date().toDateString().replaceAll(" ", "_") + ".csv",
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Small issue");
    }
  };
  return (
    <DownloadLink
      onClick={download}
      className="hocus:text-yellow hocus:text-accent-dark inline-flex cursor-pointer items-end gap-1 self-start font-medium text-accent transition-colors"
    >
      <Download width={14} />
      <span className="hidden tablet-md:block">Download </span> CSV
    </DownloadLink>
  );
};

export default DownloadButton;
