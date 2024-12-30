import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { sign } from "jsonwebtoken";

const DEMO_USER = {
  id: '1',
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'admin123',
  name: 'Admin User',
  role: 'admin' as const
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Validate credentials against DEMO_USER
        if (credentials.email === DEMO_USER.email && credentials.password === DEMO_USER.password) {
          return {
            id: DEMO_USER.id,
            email: credentials.email,
            name: DEMO_USER.name,
            role: DEMO_USER.role,
          };
        }

        return null; // Return null if credentials are invalid
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };