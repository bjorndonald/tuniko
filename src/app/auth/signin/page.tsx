import { getProviders } from "next-auth/react";
import GoogleButton from "./GoogleButton";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  const providers = await getProviders();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-24 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {Object.values(providers ?? []).map(provider => (
            <div key={provider.name}>
              {provider.name === "Google" && <GoogleButton id={provider.id} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
