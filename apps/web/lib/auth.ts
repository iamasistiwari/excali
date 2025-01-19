import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT_SECRET } from "@repo/backend-common/config";
import axios from "axios";

interface SignInData {
  user: {
    id: string,
    email: string,
    name: string,
    token: string
  }
}

export const authOptions:NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Ashish" },
        email: {
          label: "Email",
          type: "text",
          placeholder: "ashish@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Provide Credentials");
        }
        const { email, password, name } = credentials;
        if (!email || !password) {
          throw new Error("Provide Login Credentials");
        }

        try {
          const responseSignin = await axios.post(
            "http://localhost:3001/signin",
            {
              email: email,
              password: password,
            },
            { withCredentials: true },
          );

          const userDetails = (responseSignin.data) as SignInData
          return {
            id: userDetails.user.id,
            email: userDetails.user.email,
            name: userDetails.user.name,
            token: userDetails.user.token
          }

        } catch (error) {
          if (!name) {
            throw new Error("User Not Found Please Provide Name To Signup");
          }
          const responseSignup = await axios.post("http://localhost:3001/signup", {
            email: email,
            password: password,
            name: name
          }, {withCredentials: true});
          if(responseSignup.data){
            const userDetails = (responseSignup.data) as SignInData;
            return {
              id: userDetails.user.id,
              email: userDetails.user.email,
              name: userDetails.user.name,
              token: userDetails.user.token,
            };
          }
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email;
        token.name = user.name;
        token.token = user.token
      }
      return token;
    },
    async session({ token, session }) {
      session.user.id = token.id,
      session.user.email = token.email,
      session.user.name = token.name,
      session.user.token = token.token
      return session;
    },
  },
  secret: JWT_SECRET,
};
