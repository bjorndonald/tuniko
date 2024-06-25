import React, { Suspense } from "react";
import LoginForm from "./LoginForm";
import Link from "@/components/Shared/Link";

const Login = async () => {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center px-8 pb-8 pt-20">
      <div className="mb-8 flex flex-col items-center">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight">
          Welcome back 👋
        </h2>
        <p className="text-base opacity-80">
          Log in to save your activity and progress
        </p>
      </div>
      <div className="bg-primary/4 md:mb-12 card mx-auto mb-8 w-full border border-black/10 ">
        <div className="card-body">
          <Suspense fallback={<>Loading...</>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
      <div className="text-center">
        Don&apos;t have an account?{" "}
        <Link title="Register page" className="link" href="/register">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
