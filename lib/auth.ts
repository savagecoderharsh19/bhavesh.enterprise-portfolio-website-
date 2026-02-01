import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: AuthOptions = {
    // Note: No adapter needed for credentials-only auth with JWT sessions
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                console.log('[AUTH] Authorize called')
                console.log('[AUTH] Email:', credentials?.email)
                console.log('[AUTH] Password provided:', credentials?.password ? 'yes' : 'no')

                if (!credentials?.email || !credentials?.password) {
                    console.log('[AUTH] Missing credentials')
                    return null
                }

                try {
                    console.log('[AUTH] Querying database for admin...')
                    const admin = await prisma.admin.findUnique({
                        where: { email: credentials.email },
                    })

                    console.log('[AUTH] Admin found:', admin ? 'yes' : 'no')

                    if (!admin) {
                        console.log('[AUTH] No admin with email:', credentials.email)
                        return null
                    }

                    console.log('[AUTH] Admin password hash (first 20):', admin.password.substring(0, 20))
                    console.log('[AUTH] Comparing password...')

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        admin.password
                    )

                    console.log('[AUTH] Password valid:', isPasswordValid)

                    if (!isPasswordValid) {
                        console.log('[AUTH] Password mismatch')
                        return null
                    }

                    console.log('[AUTH] Success! Returning user object')
                    return {
                        id: admin.id,
                        email: admin.email,
                        role: admin.role,
                    }
                } catch (error) {
                    console.error('[AUTH] Database error:', error)
                    return null
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        },
    },
    debug: true, // Enable NextAuth debug mode
    secret: process.env.NEXTAUTH_SECRET,
}

