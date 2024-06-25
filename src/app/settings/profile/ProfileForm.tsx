"use client";
import { State, changePassword, saveProfile } from "@/actions/user";
import { Session } from "next-auth";
import React, { useEffect } from "react";
import { Mail, User } from "react-feather";
import ImageInput from "./ImageInput";
import PasswordInput from "./PasswordInput";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

const ProfileForm = ({ session }: { session: Session }) => {
  const navigate = useRouter();

  const initialState: State = { message: null, errors: {} };
  const [profileState, savePasswordAction] = useFormState(
    saveProfile,
    initialState,
  );
  const [passwordState, changePasswordAction] = useFormState(
    changePassword,
    initialState,
  );
  useEffect(() => {
    navigate.refresh();

    return () => {};
  }, [profileState]);

  return (
    <div className="min-h-full w-full px-8 py-4">
      {profileState?.status === "Error" && (
        <div role="alert" className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{profileState.message}</span>
        </div>
      )}

      {passwordState?.status === "Error" && (
        <div role="alert" className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{passwordState.message}</span>
        </div>
      )}

      <div className="mb-7 flex flex-col">
        <h2 className="mb-0 text-base font-semibold leading-7">Profile</h2>
        <p className="text-gray-600 mt-1 text-sm leading-6">
          This information is will only for tracking the corpus you have added.
        </p>
      </div>

      <div className="mb-10 flex w-full">
        <ImageInput
          defaultValue={session.user?.image}
          id="image"
          name="image"
          aria-describedby="image-error"
        />
        {!!profileState?.errors?.image && (
          <div
            id="image-error"
            aria-live="polite"
            aria-atomic="true"
            className="flex flex-col gap-1"
          >
            {profileState.errors.image?.map((x, i) => (
              <p key={i} className="text-xs font-medium text-red-600">
                {x}
              </p>
            ))}
          </div>
        )}
      </div>

      <form action={savePasswordAction} className="mb-10 flex flex-col">
        <div className="mb-6 flex w-full gap-4">
          <div className="flex flex-1 flex-col gap-1">
            <span className="label-text">Name</span>
            <label
              htmlFor="name"
              className="input input-bordered flex items-center gap-2"
            >
              <User className="opacity-70" size={16} />
              <input
                defaultValue={session.user.name}
                id="name"
                type="text"
                name="name"
                className="grow"
                placeholder="Enter name"
                aria-describedby="name-error"
              />
            </label>
            {!!profileState?.errors?.name && (
              <div
                id="name-error"
                aria-live="polite"
                aria-atomic="true"
                className="flex flex-col gap-1"
              >
                {profileState.errors.name?.map((x, i) => (
                  <p key={i} className="text-xs font-medium text-red-600">
                    {x}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <span className="label-text">Email</span>
            <label
              htmlFor="email"
              className="input input-bordered input-disabled flex items-center gap-2"
            >
              <Mail className="opacity-70" size={16} />
              <input
                id="email"
                value={session.user.email}
                defaultValue={session.user.email}
                type="email"
                name="email"
                className="grow"
                placeholder="Enter email"
                aria-describedby="email-error"
              />
            </label>
            {profileState?.errors?.email && (
              <div
                id="email-error"
                aria-live="polite"
                aria-atomic="true"
                className="flex flex-col gap-1"
              >
                {profileState.errors.email?.map((x, i) => (
                  <p key={i} className="text-xs font-medium text-red-600">
                    {x}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="btn btn-outline btn-primary btn-wide"
            type="submit"
          >
            Save Profile Info
          </button>
        </div>
      </form>

      <form action={changePasswordAction} className="mb-6 flex flex-col">
        <input
          value={session.user.email}
          defaultValue={session.user.email}
          type="hidden"
          name="email"
        />
        <div className="mb-6 flex w-full max-w-full gap-4">
          <div className="flex flex-1 flex-col gap-1">
            <span className="label-text">Password</span>
            <PasswordInput
              id="password"
              name="password"
              placeholder="Enter here"
            />
            {passwordState?.errors?.password && (
              <div className="flex flex-col gap-1">
                {passwordState.errors.password?.map((x, i) => (
                  <p key={i} className="text-xs font-medium text-red-600">
                    {x}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <span className="label-text">Confirm password</span>
            <PasswordInput
              id="confirm-password"
              name="confirm-password"
              placeholder="Enter here"
            />
            {!!passwordState?.errors &&
              !!passwordState?.errors["confirm-password"] && (
                <div className="flex flex-col gap-1">
                  {passwordState.errors["confirm-password"]?.map((x, i) => (
                    <p key={i} className="text-xs font-medium text-red-600">
                      {x}
                    </p>
                  ))}
                </div>
              )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="btn btn-outline btn-primary btn-wide"
            type="submit"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
