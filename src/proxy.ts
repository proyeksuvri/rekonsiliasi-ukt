import { auth } from "@/lib/auth/server";

export default auth.middleware({
  loginUrl: "/auth/sign-in",
  publicRoutes: ["/", "/auth/sign-in", "/auth/sign-up"]
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
