import React from "react";
import { Mail } from "react-feather";
import SocialButtons from "./SocialButtons";

const SignUp = () => {
  return (
    <main className="px-4 pt-4">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight">
          Save your progress
        </h2>
        <div className="text-base text-base-content/80">
          Build a <strong className="text-base-content">Workout 💪</strong>{" "}
          habit and grow your garden!
        </div>
      </div>
      <div className="card mx-auto mb-8 max-w-xl bg-primary/35">
        <div className="card-body">
          <SocialButtons />
          <div className="divider py-4">
            <span className="opacity-74">OR</span>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              name="isEmail"
              id="isEmail"
              className="peer absolute left-0 top-0 z-10 h-full w-full"
            />
            <button
              className="btn btn-primary btn-block peer-checked:hidden"
              aria-label="Sign up with email"
            >
              <Mail />
              Sign up with email
            </button>
          </div>
          <div className="mt-3 text-center text-xs opacity-75">
            By signing up, you agree to our
            <a className="link" href="/tos">
              TOS
            </a>
            &
            <a className="link" href="/privacy-policy">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      <div className="mb-12 text-center font-medium">
        Already have an account?
        <a className="link" href="/login">
          Log in
        </a>
      </div>
    </main>
  );
};

export default SignUp;
