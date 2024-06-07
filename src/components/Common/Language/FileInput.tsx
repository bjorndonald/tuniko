"use client";
import React, { useCallback, useState } from "react";
import CloudIcon from "./Cloud.icon";
import { useDropzone } from "react-dropzone";
import { Download } from "react-feather";
import toast from "react-hot-toast";
import { DocType } from "@/components/Shared/Docs";

const FileInput = () => {
  const [file, setFile] = useState<File>();
  const onDrop = useCallback(async acceptedFiles => {
    // Do something with the files

    setFile(acceptedFiles[0]);
  }, []);
  const onDropRejected = useCallback(() => {
    toast.error("Wrong file format");
  }, []);
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    validator(file) {
      if (file.size > 5 * 1024)
        return {
          code: "file-too-large",
          message: "File is larger than 10 kb",
        };
    },
    accept: {
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/epub+zip": [".epub"],
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/rtf": [".rtf"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="relative flex h-[280px] w-full flex-col items-center justify-center gap-2 overflow-y-auto border-1 border-dashed border-divider text-tertiary-txt"
    >
      <input
        className="absolute left-0 top-0 hidden h-full w-full opacity-0"
        {...getInputProps()}
      />
      {isDragActive && (
        <>
          <Download size={40} />
          <h3 className="text-xl text-tertiary-txt">Drop here..</h3>
        </>
      )}
      {!file && !isDragActive && (
        <>
          <CloudIcon />
          <p className="text-lg text-tertiary-txt">Drag or drop</p>
          <p className="text-lg text-tertiary-txt">Or</p>
          <button onClick={open} className="btn btn-primary btn-sm text-white">
            Upload
          </button>
          <p className="text-lg text-tertiary-txt">Pdf, Text, Doc files</p>
        </>
      )}
      {!!file && (
        <div className="flex h-full w-full flex-col gap-3 p-6">
          <div className="flex items-center gap-2 text-lg text-tertiary-txt">
            <DocType type={file.type} />
            {file.name}
          </div>
          <p className="text-lg text-tertiary-txt"></p>
        </div>
      )}
    </div>
  );
};

export default FileInput;
