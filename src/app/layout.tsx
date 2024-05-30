import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "Ripple",
  description: "Ripple is a modern web platforme ffor influencers marketing.",
  icons: [{ rel: "icon", url: "/logo.png" }],
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
