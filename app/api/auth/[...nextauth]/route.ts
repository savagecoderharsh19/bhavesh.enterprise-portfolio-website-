import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials')
                }

                try {
                    // Find admin user
                    const admin = await prisma.admin.findUnique({
                        where: { email: credentials.email },
                    })

                    if (!admin) {
                        throw new Error('Invalid credentials')
                    }

                    // Verify password
                    const isValidPassword = await bcrypt.compare(
                        credentials.password,
                        admin.password
                    )

                    if (!isValidPassword) {
                        throw new Error('Invalid credentials')
                    }

                    return {
                        id: admin.id,
                        email: admin.email,
                        role: admin.role,
                    }
                } catch (error) {
                    console.error("Auth DB Error:", error)
                    return null
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
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
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
