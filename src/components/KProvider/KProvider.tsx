"use client";
import useCircles from "@/store/circles";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import {
  Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
} from "kbar";
import { allProjects } from "contentlayer/generated";
import {
  Book,
  Briefcase,
  Home,
  Layout,
  Search,
  Target,
  ToggleLeft,
} from "react-feather";
import toast from "react-hot-toast";
import { IconFactory } from "../Shared/Icons";
import Kbd from "../Shared/Kbd";
import KResults from "./KResults";

interface KProviderProps {
  children: ReactNode;
}

const KProvider = ({ children }: KProviderProps): JSX.Element => {
  const { push } = useRouter();
  const { toggleCircles } = useCircles();

  const actions: Action[] = [
    {
      id: "home",
      name: "Home",
      keywords: "index root",
      shortcut: ["h"],
      perform: () => push("/"),
      section: "Pages",
      icon: <Home />,
    },
    {
      id: "contact",
      name: "Contact",
      keywords: "contacts email community wall",
      shortcut: ["g"],
      perform: () => push("/contact"),
      section: "Pages",
      icon: <Book />,
    },
    {
      id: "templates",
      name: "Templates",
      keywords: "achievements",
      shortcut: ["a"],
      perform: () => push("/achievements"),
      section: "Pages",
      icon: <Target />,
    },
    {
      id: "projects",
      name: "Projects",
      keywords: "projects creations apps repositories",
      section: "Pages",
      icon: <Briefcase />,
    },
    {
      id: "projects-page",
      name: "All Projects",
      keywords: "projects creations apps repositories",
      shortcut: ["p"],
      parent: "projects",
      perform: () => push("/projects"),
    },
    {
      id: "blog",
      name: "Blog",
      keywords: "blogs blog post articles tutorials",
      section: "Pages",
      icon: <Layout />,
    },
    {
      id: "blogs-page",
      name: "All Blog Posts",
      keywords: "blogs blog post articles tutorials",
      shortcut: ["b"],
      parent: "blog",
      perform: () => push("/blog"),
    },
    {
      id: "toggle-circles",
      name: "Toggle Circles",
      keywords: "toggle circles",
      shortcut: ["t", "c"],
      icon: <ToggleLeft />,
      perform: () => {
        toggleCircles();
        toast.success("Circles toggled");
      },
    },
  ];

  allProjects.map(project => {
    actions.push({
      id: project._id,
      name: project.name,
      perform: () => push("/projects/" + project.slug),
      icon: <IconFactory name={project.iconName} />,
      parent: "projects",
    });
  });

  return (
    <KBarProvider>
      <KBarPortal>
        <KBarPositioner className="z-30 bg-secondary/60 backdrop-blur-md backdrop-filter">
          <KBarAnimator className="mx-auto w-[32rem] overflow-hidden rounded-xl border-[1px] border-tertiary bg-secondary/60 px-4 drop-shadow-2xl ">
            <div className="mx-2 flex items-end justify-between py-4">
              <span>
                <Search className="mb-0.5 mr-2 h-5 w-5 text-gray-100" />
              </span>
              <KBarSearch className="w-full rounded-md border-b border-none border-gray-300 bg-transparent pt-2 text-gray-100 outline-none" />
              <Kbd>esc</Kbd>
            </div>

            <KResults />
            <div className="h-4" />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};

export default KProvider;
