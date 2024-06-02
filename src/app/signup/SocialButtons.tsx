"use client";
import { AppleIcon, GoogleIcon } from "@/components/Shared/Icons";
import React from "react";

const SocialButtons = () => {
  return (
    <>
      <button
        aria-label="Sign up with Google"
        className="hover:bg-gray-100 btn btn-block !border-base-content/20 bg-white text-black hover:text-black "
      >
        <GoogleIcon />
        Sign up with Google
      </button>
      <button
        aria-label="Sign up with Apple"
        className="btn btn-block border-0 bg-black text-white hover:bg-black/80 hover:text-white "
      >
        <AppleIcon />
        Sign up with Apple
      </button>
    </>
  );
};

export default SocialButtons;
