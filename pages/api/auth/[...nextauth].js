import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
// import { CredentialsProvider } from "next-auth/providers";
import connectMongo from "@/database/connectDb";
import { compare } from "bcryptjs";
import Users from "@/model/schema";
// import { compare } from "bcryptjs";
export default nextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Connection Failed...!";
        });

        // check if user is already existing
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error(
            " A User with the given Email does not exist, please Sign Up!"
          );
        } // User does exist, now compare passwords..
        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        //incorrect?
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password is not matching");
        }
        return result;
      },
    }),
  ],
  // node <openssl rand -base64 32>
  secret: "I1U2ZmNDvugN2tnrCKyMZ8gEWLZs67RuPD5PxNH9pkU=",
  session: {
    strategy: "jwt",
  },
});
