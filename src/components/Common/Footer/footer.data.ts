export const linksGroups = [
  {
    title: "Product",
    a11yTitle: "Product links",
    links: [
      {
        title: "iOS App",
        href: "/ios",
        className: "text-brand",
      },
      {
        title: "Android App",
        href: "/request",
        className: "text-green",
      },
      {
        title: "Web App",
        href: "/web",
        className: "text-orange",
      },
      {
        title: "Updates",
        href: "/updates",
        className: "text-purple",
      },
      // {
      //   title: "Templates",
      //   href: "/templates",
      //   className: "text-yellow",
      // },
      // {
      //   title: "Uses",
      //   href: "/uses",
      //   className: "text-blue",
      // },
    ],
  },
  {
    title: "Social",
    a11yTitle: "Social links",
    links: [
      {
        title: "Twitter",
        href: "#",
        className: "text-green",
        props: {
          ignoreNextLink: true,
        },
      },
    ]
  },
  {
    title: "Misc",
    a11yTitle: "Features links",
    links: [
      {
        title: "Contact",
        href: "/contact",
        className: "text-green",
        props: {
          ignoreNextLink: true,
        },
      },
      {
        title: "Privacy Policy",
        href: "/policy",
        className: "text-orange",
      },
      {
        title: "Terms and Conditions",
        href: "/terms",
        className: "text-purple",
      },
      {
        title: "Back to Top",
        a11yTitle: "Scroll back to top",
        href: "#page",
        className: "text-brand",
      },
    ],
  },
];
