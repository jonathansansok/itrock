//social-basic\src\app\api\auth\[...nextauth]\route.ts
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

const handler = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
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
        const name  = (creds?.name || "").trim() || email.split("@")[0];
        const password = (creds?.password || "").trim();

        console.log("[Credentials.authorize] email:", email);

        const emailOk = /\S+@\S+\.\S+/.test(email);
        const passOk = password.length >= 3;
        if (!emailOk || !passOk) return null;

        return { id: email, name, email, image: undefined };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        // extendemos el token de forma segura
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
        // si querés guardar un id, usá el email como id
        (token as JWT & { id?: string }).id = user.email ?? undefined;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      // nos aseguramos de que session.user exista
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
