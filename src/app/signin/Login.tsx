"use client";
import React from "react";
import GoogleIcon from "../../components/Shared/Icons/Google.icon";
import AppleIcon from "../../components/Shared/Icons/Apple.icon";
import { ArrowRight, Eye, EyeOff } from "react-feather";

const Login = () => {
  return (
    <div className="pt-20">
      <div className="mb-8 flex flex-col">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight">
          Welcome back 👋
        </h2>
        <p className="text-base opacity-80">
          Log in to save your activity and progress
        </p>
      </div>
      <div className="md:mb-12 card mx-auto mb-8 max-w-xl bg-base-100 ">
        <div className="card-body">
          <button className="hover:bg-gray-100 btn btn-block !border-base-content/20 bg-white text-black hover:text-black ">
            <GoogleIcon />
          </button>
          <button className="btn btn-block border-0 bg-black text-white hover:bg-black/80 hover:text-white ">
            <AppleIcon /> Sign in with Apple
          </button>
          <div className="divider">
            <span className="opacity-75">OR</span>
          </div>
          <form action="#">
            <div className="form-group">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                inputMode="email"
                autoComplete="username"
                autoCapitalize="none"
                placeholder="vote@vote.com"
                className="form-control input input-bordered w-full"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
                <a href="/forgot-password" className="label-text-alt">
                  Forgotten password?
                </a>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="form-control input input-bordered w-full "
                  value=""
                />
                <span className="password-toggle-icon">
                  <Eye />
                  <EyeOff />
                </span>
              </div>
            </div>
            <div className="form-group pt-4">
              <button type="submit" className="btn btn-primary btn-block ">
                Sign in
                <ArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="text-center">
        Don&apos;t have an account?{" "}
        <a className="link" href="/signup">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Login;
