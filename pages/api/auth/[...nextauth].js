import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { validateUsers } from "../users";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      if (account.id_token) {
        const isValid = await validateUsers(account.id_token);
        return isValid;
      }
      else {
        return false;
      }
    },
  },
});
