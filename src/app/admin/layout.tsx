import { ADMINS } from "@/constants";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session?.user?.email || !ADMINS.includes(session.user.email)) {
    redirect("/");
  }
  return <>{children}</>;
}
