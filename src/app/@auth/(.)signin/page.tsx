import SignIn from "@/app/signin";
import Modal from "@/components/Common/PageModal";
import React from "react";

const page = () => {
  return (
    <Modal show>
      <SignIn />
    </Modal>
  );
};

export default page;
