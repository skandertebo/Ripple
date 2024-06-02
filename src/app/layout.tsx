import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import InfluencerPage from "./influencers/[id]/page";

export const metadata = {
  title: "Ripple",
  description: "Ripple is a modern web platform for influencers marketing.",
  icons: [{ rel: "icon", url: "/logo1.png" }],
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
