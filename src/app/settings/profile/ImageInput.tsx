"use client";
import Image from "next/image";
import React, { ComponentProps, useState } from "react";
import { User } from "react-feather";

const ImageInput = (props: ComponentProps<"input">) => {
  const [file, setFile] = useState<File>();
  const { id, name } = props;
  return (
    <div className="flex w-fit flex-col items-center gap-2 ">
      <div className="relative">
        {!!file && !props.defaultValue && (
          <Image
            width={144}
            height={144}
            className="h-36 w-36 rounded-full"
            src={URL.createObjectURL(file)}
            alt="Profile image"
          />
        )}
        {!!props.defaultValue && (
          <Image
            width={144}
            height={144}
            className="h-36 w-36 rounded-full"
            src={props.defaultValue as string}
            alt="Profile image"
          />
        )}
        {!file && !props.defaultValue && <User size={144} />}
        <input
          onChange={e => {
            setFile(e.target.files[0]);
          }}
          id={id}
          name={name}
          className="absolute left-0 top-0 z-10 h-full w-full opacity-0"
          type="file"
        />
      </div>

      <label htmlFor={props.id} className="btn btn-outline btn-sm">
        Change
      </label>
    </div>
  );
};

export default ImageInput;
