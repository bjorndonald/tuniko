import { ReactNode } from "react";

import {
  DevToLogo,
  GitHubLogo,
  HashnodeLogo,
  Twitterlogo,
  YouTubeLogo,
} from "@/components/Shared/Icons";

interface Social {
  id: string;
  name: string;
  url: string;
  icon: ReactNode;
}

const socials: Social[] = [
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/6lackbjorn",
    icon: <Twitterlogo color="#1DA1F2" />,
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/bjorndonald",
    icon: <GitHubLogo />,
  },
  {
    id: "hashnode",
    name: "Hashnode",
    url: "https://hashnode.com/bjorndonald",
    icon: <HashnodeLogo color="#2962ff" />,
  },
  {
    id: "linkedin",
    name: "Linkedin",
    url: "https://www.linkedin.com/in/bjorn-donald-bassey/",
    icon: <DevToLogo color="#f0f0f0" />,
  },
];

export default socials;
