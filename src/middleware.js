import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;
    const {pathname} = req.nextUrl;

    // Optional for debugging only
    console.log("Role from token:", role);
    console.log("Pathname:", pathname);

    // Admin route protection
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Donor route protection
    if (pathname.startsWith("/user") && role !== "donor" && role !== "patient") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({token}) => !!token, // ensures token is loaded
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/homePage", "/dashboard", "/user/:path*", "/admin/:path*"],
};
