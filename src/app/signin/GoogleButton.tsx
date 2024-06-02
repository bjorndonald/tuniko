"use client";
import React from "react";
import { signIn, LiteralUnion } from "next-auth/react";
import GoogleIcon from "../../components/Shared/Icons/Google.icon";
import { BuiltInProviderType } from "next-auth/providers/index";
import { useRouter } from "next/navigation";

interface Props {
  id: LiteralUnion<BuiltInProviderType, string>;
}
const GoogleButton = ({ id }: Props) => {
  const navigate = useRouter();
  const login = async () => {
    await signIn(id);
    navigate.replace("/");
  };

  return (
    <button
      onClick={login}
      className="google-blue rounded text-gray-100 mx-auto flex w-64 cursor-pointer items-center justify-start px-4 py-3 text-sm font-bold shadow hover:text-white"
    >
      <GoogleIcon />
      <span className="block h-6 w-1 border-l border-blue-500"></span>
      <span className="pl-3">Sign in with Google</span>
    </button>
  );
};

export default GoogleButton;
