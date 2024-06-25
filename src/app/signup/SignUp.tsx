"use client";
import React from "react";
import { Linkedin, Mail } from "react-feather";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/components/Shared/Icons";
import SignUpForm from "./SignUpForm";
import { useSearchParams } from "next/navigation";

const SignUp = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <main className="px-4 pt-20">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight">
          Save your progress
        </h2>
        <div className="text-base text-base-content/80">
          Help the community undestand each other
        </div>
      </div>
      <div className="card mx-auto mb-8 max-w-xl border border-base-300">
        <div className="card-body">
          <button
            aria-label="Sign up with Google"
            onClick={() => signIn("google", { callbackUrl })}
            className="btn btn-block !border-base-content/20 bg-white text-black hover:bg-primary hover:text-white "
          >
            <GoogleIcon /> Sign up with Google
          </button>
          <button
            aria-label="Sign up with Linkedin"
            onClick={() => signIn("linkedin", { callbackUrl })}
            className="btn btn-block border-0 bg-black text-white hover:bg-black/80 hover:text-white "
          >
            <Linkedin /> Sign up with LinkedIn
          </button>
          <div className="divider py-4">
            <span className="opacity-74">OR</span>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              name="isEmail"
              id="isEmail"
              className="peer absolute left-0 top-0 z-10 h-full w-full opacity-0"
            />
            <button
              className="btn btn-primary btn-block peer-checked:hidden"
              aria-label="Sign up with email"
            >
              <Mail />
              Sign up with email
            </button>
            <div className="relative hidden peer-checked:z-30 peer-checked:block">
              <SignUpForm />
            </div>
          </div>
          <div className="mt-3 text-center text-xs opacity-75">
            By signing up, you agree to our{" "}
            <a className="link" href="/tos">
              TOS
            </a>{" "}
            &{" "}
            <a className="link" href="/privacy-policy">
              Privacy Policy
            </a>{" "}
          </div>
        </div>
      </div>
      <div className="mb-12 text-center font-medium">
        Already have an account?{" "}
        <a className="link" href="/signin">
          Log in
        </a>
      </div>
    </main>
  );
};

export default SignUp;
