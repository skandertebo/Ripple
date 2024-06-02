import type { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { decode } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "./env";

const protectedRoutes = ["/influencers"];

interface NextRequestWithUser extends NextRequest {
  user?: User;
}

export async function middleware(request: NextRequestWithUser) {
  const { pathname } = request.nextUrl;
  let host = new URL(request.nextUrl.href).host;
  console.log(host);
  if (!host.startsWith("http://") && !host.startsWith("https://")) {
    host = `http://${host}`;
  }
  let isProtectedRoute = false;
  for (const route of protectedRoutes) {
    if (pathname.match(route)) {
      isProtectedRoute = true;
      break;
    }
  }
  if (isProtectedRoute) {
    const cookies = request.cookies;
    const jwt = cookies.get("next-auth.session-token");
    console.log(jwt);
    if (!jwt?.value) {
      return Response.redirect(host + "/api/auth/signin/");
    } else {
      try {
        const decodeRes = await decode({
          token: jwt.value,
          secret: env.NEXTAUTH_SECRET!,
        });
        if (!decodeRes) {
          return Response.redirect(host + "/api/auth/signin/");
        }
        const { data: user } = await axios.get<User>(
          `${host}/api/user/${decodeRes.sub}`,
        );
        if (!user) {
          return Response.redirect(host + "/api/auth/signin/");
        }
        request.user = user;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error.response?.data);
        } else console.error(error);
        return Response.redirect(host + "/api/auth/signin/");
      }
    }
  }
  const response = NextResponse.next();
  return response;
}
