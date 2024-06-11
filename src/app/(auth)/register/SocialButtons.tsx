"use client";
import { signIn } from "@/auth";
import { GoogleIcon } from "@/components/Shared/Icons";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Linkedin } from "react-feather";

const SocialButtons = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <>
      <button
        onClick={() => signIn("google", { callbackUrl })}
        aria-label="Sign up with Google"
        className="hover:bg-gray-100 btn btn-block !border-base-content/20 bg-white text-black hover:text-black "
      >
        <GoogleIcon />
        Sign up with Google
      </button>
      <button
        onClick={() => signIn("linkedin", { callbackUrl })}
        aria-label="Sign up with Linkedin"
        className="btn btn-block border-0 bg-black text-white hover:bg-black/80 hover:text-white "
      >
        <Linkedin />
        Sign up with Linkedin
      </button>
    </>
  );
};

export default SocialButtons;
