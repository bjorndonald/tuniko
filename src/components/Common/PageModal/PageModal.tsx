"use client";
import cx from "@/utils/cx";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  show: boolean;
}

const PageModal = ({ show, children }: Props) => {
  const navigation = useRouter();
  return (
    <dialog id="my_modal_3" className={cx("modal", show && "modal-open")}>
      <div className="modal-box bg-background">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            onClick={() => navigation.back()}
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
};

export default PageModal;
