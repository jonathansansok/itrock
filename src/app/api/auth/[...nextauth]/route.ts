// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent select_account", 

        },
      },
    }),

    Credentials({
      name: "Email & Password",
      credentials: {
        name: { label: "Nombre" },
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const email = (creds?.email || "").trim();
        const name = (creds?.name || "").trim() || email.split("@")[0];
        const password = (creds?.password || "").trim();
        if (!/\S+@\S+\.\S+/.test(email) || password.length < 3) return null;
        return { id: email, name, email, image: undefined };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
        (token as JWT & { id?: string }).id = user.email ?? undefined;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      session.user = {
        name: session.user?.name ?? (token.name as string) ?? "",
        email: session.user?.email ?? (token.email as string) ?? "",
        image: session.user?.image ?? undefined,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
