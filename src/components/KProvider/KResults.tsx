import React, { ReactElement, cloneElement } from "react";
import { KBarResults, useMatches } from "kbar";
import cx from "classnames";
import { ArrowRight } from "react-feather";
import Kbd from "../Shared/Kbd";

const KResults = () => {
  const { results } = useMatches();
  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="px-3 pb-2 pt-4 text-sm text-gray-400">{item}</div>
        ) : (
          <div
            className={cx(
              "flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 transition-colors",
              active ? "bg-tertiary" : "bg-transparent",
            )}
          >
            <div className="flex items-center">
              {item.icon && (
                <div className="mr-4">
                  {cloneElement(item.icon as ReactElement<any>, {
                    className: "h-4 w-4",
                  })}
                </div>
              )}
              {item.parent && (
                <>
                  <span className="opacity-50">
                    {
                      item.ancestors.find(
                        ancestor => ancestor.id === item.parent,
                      )?.name
                    }
                  </span>
                  <span className="opacity-60">
                    <ArrowRight className="mx-2 h-4 w-4" />
                  </span>
                </>
              )}
              <span className="text-md">{item.name}</span>
            </div>
            {item.shortcut?.length && (
              <div className="flex items-center justify-center space-x-2">
                {item.shortcut.map(shortcut => (
                  <Kbd key={shortcut}>{shortcut}</Kbd>
                ))}
              </div>
            )}
          </div>
        )
      }
    />
  );
};

export default KResults;
