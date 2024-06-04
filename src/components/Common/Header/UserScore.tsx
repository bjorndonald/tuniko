"use client";
import { getUserScore } from "@/actions/user";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";

interface Props {
  session: Session;
}

const UserScore = ({ session }: Props) => {
  const [score, setScore] = useState<number>(null);
  useEffect(() => {
    const init = async () => {
      const score = await getUserScore(session.user.email);

      setScore(score);
    };
    init();
    return () => {};
  }, []);

  return (
    <>
      {score != null && (
        <div className="flex items-center gap-2 tablet-md:ml-4">
          <progress
            className="progress progress-primary hidden w-28 bg-progress tablet-md:block"
            value={(score - Math.floor(score)) * 100}
            max={"100"}
          ></progress>
          <span className="text-sm font-semibold text-primary">
            {score.toFixed(1)}
          </span>
        </div>
      )}
      {score == null && <div className="skeleton h-3.5 w-30"></div>}
    </>
  );
};

export default UserScore;
