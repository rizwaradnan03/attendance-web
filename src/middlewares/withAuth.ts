import { RoleRoutes } from "@/routes/roleRoutes";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default function withAuth(middleware) {
  return async (req, next) => {
    const pathName = req.nextUrl.pathname;
      const token = await getToken({
        req,
        secret: process.env.SECRET_KEY,
      });

      if (!token) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      // Dapatkan peran pengguna dari token
      const userRolePaths = RoleRoutes[token.role];
      const hasAccess = userRolePaths.some((route) => route.path === pathName);
      if (!hasAccess) {
        return NextResponse.redirect(new URL("/no-access", req.url));
      }
      return middleware(req, next);
  };
}
