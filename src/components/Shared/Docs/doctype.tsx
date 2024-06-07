import React from "react";
import Doc from "./Doc";
import DocX from "./DocX";
import Pdf from "./Pdf";
import Pub from "./Pub";
import Txt from "./Txt";

interface Props {
  type: string;
}

const DocType = ({ type }: Props) => {
  return (
    <>
      {type === "application/msword" && <Doc />}
      {type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
        <DocX />
      )}
      {type === "application/pdf" && <Pdf />}
      {type === "application/epub+zip" && <Pub />}
      {type === "text/plain" && <Txt />}
    </>
  );
};

export default DocType;
