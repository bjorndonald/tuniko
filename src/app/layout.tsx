import "./../styles/global.scss";
import { PT_Sans as ptsans } from "next/font/google";
import Header from "@/components/Common/Header";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/Common/Footer";
import { createMetadata } from "@/utils/metadata";
import { Meta } from "./meta";
import Script from "next/script";
import ThemeProvider from "@/providers/ThemeProvider";
// import FCMToken from "./fcmtoken";

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
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html id="page" lang="en" suppressHydrationWarning>
      <head>
        <Meta />
        <Script
          src={"/sw.js"}
          data-domains={"tuniko.com"}
          strategy={"lazyOnload"}
        />
        <Script
          src={"https://umami.tuniko.com/script.js"}
          data-website-id={umamiWebsiteId}
          data-domains={"tuniko.com"}
          strategy={"lazyOnload"}
        />
      </head>
      <body className={`${ptSans.className} min-h-screen`}>
        <ThemeProvider>
          <SessionProvider>
            {/* <FCMToken /> */}
            <Header />
            {children}
            {auth}
            <Toaster />
            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
