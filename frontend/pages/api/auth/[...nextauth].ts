import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async session({ session, user }) {
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirect ke dashboard setelah login
      if (url.startsWith('/')) return `${baseUrl}/dashboard`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl + '/dashboard'
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      // Log successful login
      console.log('User signed in:', user.email)
    },
  },
}

export default NextAuth(authOptions)
