import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { users } from "@/lib/mockDb";

const handler = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    Credentials({
      name: "Email & Password",
      credentials: { email: { label: "Email" }, password: { label: "Password", type: "password" } },
      async authorize(creds) {
        const user = users.find(u => u.email === creds?.email);
        return user ? { id: user.id, name: user.name, email: user.email, image: user.image } : null;
      },
    }),
  ],
  session: { strategy: "jwt" },
});
export { handler as GET, handler as POST };
