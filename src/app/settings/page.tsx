import { redirect } from "next/navigation";

const SettingsPage = () => {
  redirect("/settings/profile");
  return null;
};

export default SettingsPage;
