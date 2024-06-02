'use client';
import { getCorpusFile } from '@/actions/corpus';
import React from 'react'
import { Download } from 'react-feather'
import toast from 'react-hot-toast';

const DownloadButton = () => {
    const download = async () => {
        try {
           const blob = await getCorpusFile()
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Corpus_"+ new Date().toDateString().replaceAll(" ", "_")+".csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            toast.error("Small issue")
        }  
    }
  return (
      <button onClick={download} className="btn btn-outline btn-primary mr-2 flex !border-primary !text-primary hover:!bg-primary hover:!text-white">
          <Download width={20} />
          <span className="hidden tablet-md:block">Download</span> CSV
      </button>
  )
}

export default DownloadButton