"use client";
import { postUpdateSetting } from "@/actions/settings";
import cx from "@/utils/cx";
import { Session } from "next-auth";
import React, { ComponentProps, useState } from "react";
import toast from "react-hot-toast";
import { closeMenu } from "@/utils/func";

interface Props extends ComponentProps<"form"> {
  session: Session;
  initialSetting: string;
}

const SETTING_LIST = ["Hourly", "Daily", "Weekly"];

const UpdatesForm = (props: Props) => {
  const { session, initialSetting, action, ...rest } = props;
  const [setting, setSetting] = useState(initialSetting);
  const [updates, setUpdates] = useState(initialSetting !== "None");

  const handleSubmit = async (formData: FormData) => {
    try {
      toast.loading("Loading...", { id: "loading" });
      await postUpdateSetting(session.user.email, setting);
      toast.remove("loading");
      toast.success("Settings saved.");
    } catch (error) {
      console.log(error);
      toast.remove("loading");
      toast.error("There was an issue.");
    }
  };
  action

  return (
    <form action={handleSubmit} {...rest} className="mb-5 flex flex-col">
      <h3 className="mb-2 text-lg">Browser Updates</h3>
      <div className="mb-3 flex items-center gap-4">
        <div className="form-control">
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              checked={updates}
              onChange={() => {
                if (!updates) setSetting("Daily");
                else setSetting("None");
                setUpdates(!updates);
              }}
              className="checkbox-primary checkbox checkbox-sm"
            />
            <span className="label-text">Get browser updates</span>
          </label>
        </div>
        <div
          className={cx(
            "dropdown",
            !updates && "pointer-events-none opacity-50",
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="rounded btn btn-outline m-1 h-9 min-h-9 border-base-300 font-normal text-primary hover:bg-primary/10 hover:text-primary"
          >
            {setting}
          </div>
          <ul
            tabIndex={0}
            className="rounded bg-background text-tertiary-txt menu dropdown-content z-[1] w-52 border border-base-300 bg-base-100 p-2 shadow"
          >
            {SETTING_LIST.map((x, i) => (
              <li
                key={i}
                onClick={() => {
                  setSetting(x);
                  closeMenu();
                }}
              >
                <a>{x}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="btn btn-outline btn-primary btn-sm btn-wide"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default UpdatesForm;
