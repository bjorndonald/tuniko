import React from "react";
import { auth } from "@/auth";
import ProfileForm from "./ProfileForm";

const ProfilePage = async () => {
  const session = await auth();
  return <ProfileForm session={session} />;
};

export default ProfilePage;
