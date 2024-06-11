import "./../../styles/global.scss";
import { PT_Sans as ptsans } from "next/font/google";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { createMetadata } from "@/utils/metadata";
import { Meta } from "./../meta";
import Script from "next/script";
import ThemeProvider from "@/providers/ThemeProvider";

const ptSans = ptsans({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  ...createMetadata({
    title: "Tuniko | Help Us Translate",
    description:
      "This is a platform that allows users to help each other with translations for languages not supported digitally",
    keywords: ["translations", "community", "efik", "translate", "web"],
  }),
};

const { UMAMI_WEBSITE_ID: umamiWebsiteId = "" } = process.env;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html id="page" lang="en" suppressHydrationWarning>
      <head>
        <Meta />
        <Script
          src={"https://umami.tuniko.com/script.js"}
          data-website-id={umamiWebsiteId}
          data-domains={"tuniko.com"}
          strategy={"lazyOnload"}
        />
      </head>
      <body className={ptSans.className}>
        <ThemeProvider>
          <SessionProvider>
            <Header />
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
