import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

type JWTWithUID = JWT & { uid?: string };
type SessionUserWithId = Session["user"] & { id?: string };

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: { params: { prompt: "consent select_account" } },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim();
        const pass = credentials?.password?.trim();
        if (!email || !pass || pass.length < 3) return null;
        return { id: email, name: email, email };
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },

  callbacks: {
    async jwt(
      { token, user }: { token: JWT; user?: User }
    ): Promise<JWT> {
      if (user?.id) (token as JWTWithUID).uid = user.id;
      return token;
    },
    async session(
      { session, token }: { session: Session; token: JWT }
    ): Promise<Session> {
      const t = token as JWTWithUID;
      if (t.uid) {
        (session.user as SessionUserWithId).id = t.uid;
      }
      return session;
    },
  },
};
