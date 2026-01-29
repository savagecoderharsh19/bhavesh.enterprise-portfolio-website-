import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ token, req }) => {
            const { pathname } = req.nextUrl

            // Publicly accessible admin routes
            if (pathname === "/admin/login") return true

            // Protected admin routes require a valid token
            if (pathname.startsWith("/admin")) return !!token

            return true
        },
    },
    pages: {
        signIn: "/admin/login",
    },
})

export const config = {
    matcher: ["/admin/:path*"],
}
