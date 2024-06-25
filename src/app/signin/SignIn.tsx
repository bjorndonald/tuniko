"use client";
import React, { Suspense, useEffect } from "react";
import SigninForm from "./SigninForm";
import Link from "@/components/Shared/Link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const SignIn = async () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "OAuthAccountNotLinked")
      toast.error("Email is used with another social link", { id: "error" });
    return () => {
      toast.remove("error");
    };
  }, []);

  return (
    <div className="pt-20">
      <div className="mb-8 flex flex-col items-center">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight">
          Welcome back 👋
        </h2>
        <p className="text-base opacity-80">
          Log in to save your activity and progress
        </p>
      </div>
      <div className="bg-primary/4 md:mb-12 card mx-auto mb-8 max-w-xl border border-black/10 ">
        <div className="card-body">
          <Suspense fallback={<>Loading...</>}>
            <SigninForm />
          </Suspense>
        </div>
      </div>
      <div className="text-center">
        Don&apos;t have an account?{" "}
        <Link title="Register page" className="link" href="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
