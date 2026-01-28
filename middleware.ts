import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req) {
        // If user is authenticated, allow access
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Check if route is admin route
                const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
                const isLoginPage = req.nextUrl.pathname === '/admin/login'

                // Allow access to login page without token
                if (isLoginPage) {
                    return true
                }

                // Require token for admin routes
                if (isAdminRoute) {
                    return !!token
                }

                // Allow all other routes
                return true
            },
        },
        pages: {
            signIn: '/admin/login',
        },
    }
)

export const config = {
    matcher: [
        '/admin/:path*',
    ],
}
