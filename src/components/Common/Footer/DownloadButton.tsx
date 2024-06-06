"use client";
import { getCorpusFile } from "@/actions/corpus";
import React from "react";
import { Download } from "react-feather";
import toast from "react-hot-toast";
import { DownloadLink, FooterLink } from "./footer.styles";
import Link from "@/components/Shared/Link";

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
      className="hocus:text-yellow"
    >
      <Download width={20} />
      <span className="hidden tablet-md:block">Download</span> CSV
    </DownloadLink>
  );
};

export default DownloadButton;
