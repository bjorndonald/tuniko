import CorpusText from "@/types/corpustext";
import React, { ComponentProps, useEffect } from "react";
import { X } from "react-feather";

interface Props extends Omit<ComponentProps<"div">, "id"> {
  id: string;
  corpuslist: CorpusText[];
}

const BadgeGrid = (props: Props) => {
  const { corpuslist, ...rest } = props;
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="flex w-full flex-col gap-4" {...rest}>
      {corpuslist.reverse().map((x, i) => (
        <div key={i} className="relative flex w-full items-center gap-4">
          <span className="text-sm">{i + 1}.</span>
          <p className="grow overflow-y-hidden text-ellipsis whitespace-nowrap text-sm">
            {x.text}
          </p>

          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="rounded btn btn-outline m-1 h-9 min-h-9 border-base-300 font-normal text-primary hover:bg-primary/10"
            >
              All Languages
            </div>
            <ul
              tabIndex={0}
              className="rounded bg-background text-tertiary-txt  menu dropdown-content z-[1] w-52 border border-base-300 p-2 shadow"
            >
              <li>
                <a>All Languages</a>
              </li>
              <li>
                <a>Efik</a>
              </li>
              <li>
                <a>English</a>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="rounded btn btn-outline m-1 h-9 min-h-9 border-base-300 font-normal text-primary hover:bg-primary/10"
            >
              All Updates
            </div>
            <ul
              tabIndex={0}
              className="rounded bg-background text-tertiary-txt  menu dropdown-content z-[1] w-52 border border-base-300 p-2 shadow"
            >
              <li>
                <a>All Updates</a>
              </li>
              <li>
                <a>Upvotes</a>
              </li>
              <li>
                <a>Downvotes</a>
              </li>
              <li>
                <a>Choices</a>
              </li>
            </ul>
          </div>

          <a className="btn btn-circle btn-ghost">
            <X size={12} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default BadgeGrid;
