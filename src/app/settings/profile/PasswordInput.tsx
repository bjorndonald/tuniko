"use client";
import React, { ComponentProps, useState } from "react";
import { Eye, EyeOff, Key } from "react-feather";

const PasswordInput = (props: ComponentProps<"input">) => {
  const [show, setShow] = useState(false);
  return (
    <label
      htmlFor={props.name}
      className="input input-bordered flex items-center gap-2"
    >
      <Key className="opacity-70" size={16} />
      <input
        type={show ? "text" : "password"}
        name={props.name}
        className="grow"
        {...props}
      />
      <a onClick={() => setShow(!show)} className="btn btn-circle btn-ghost">
        {show ? <EyeOff /> : <Eye />}
      </a>
    </label>
  );
};

export default PasswordInput;
