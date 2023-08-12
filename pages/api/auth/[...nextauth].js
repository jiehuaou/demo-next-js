//@ts-check
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { getToken } from "next-auth/jwt"

let counter = 0;
const getCounter = () => {  
    return ++counter;
};

async function handler(req, secret) {
  // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
  // const token = await getToken({ req })
  const token = await getToken({ req, secret });
  console.log("JSON Web Token", token);
  return token;
}

/**
 * use jsDoc to declare type extending
 * 
 * 
 * @typedef {import("next-auth").User & import("../../../pages/types").UserExtended} RoleUser
 * 
 */


/**
 * @type {import("next-auth").AuthOptions}
 */
const options = {
  secret: process.env.SECRET_TEXT,
  providers: [
    GithubProvider({
      clientId: '6324f23cf4c7363f0bba',
      clientSecret: 'bdb15e2bbaf504997e039b34c739afaa79c68213',
      // clientSecret: 'ab305403f3a401fad6168b4104d4432b72d20a12'
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },

      /**
       * demo to authenticate via back-end java with username/password 
       * 
       * @param {*} credentials 
       * @param {*} req 
       * @returns 
       */
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log(`try [authorize] login .......... ${email} / ${password}`);
        // mock to call the back-end java back-end
        const res = await fetch("http://localhost:3000/api/login-psw", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const user = await res.json();
        if (res.ok && user) {
          console.log(`[authorize] return user ..........user:`, user);
          return user;
        } else {
          return null;
        } 
      },
    }),
    // ...add more providers here
  ],
  callbacks: {


    /**
     * this callback merge （user, account ）into token
     * 
     * @param {object} args
     * 
     * @param {import("next-auth/jwt").JWT} args.token
     * @param {RoleUser} args.user - user is from authorize(), which may contain jwt by external service.
     * @param {import("next-auth").Account | null} args.account - which has access_token (jwt), if user does not provide jwt.
     * 
     * @returns {Promise<object>}
     */
    async jwt({ token, user, account }) {
      
      // "user" is from authorize(), which may provide jwt by external service.
      // "account" provides access_token (jwt) by Build-in provider as well.
      // selecting jwt from either "Account" or "User" is depending on your need.

      // this is for build-in provider
      if (account && account.provider==='github' ) {
        token.accessToken = account.access_token;
        token.role = account.scope;
      }

      // this is for CredentialsProvider
      if (account && account.provider==='credentials' && user) {
        token.role = user?.role??'anonsymous';
        if (user?.accessToken) {
          token.accessToken = user?.accessToken;
        }
        if (user?.refreshToken) {
          token.refreshToken = user?.refreshToken;
        }
        if (user?.tokenExpireAt) {
          token.tokenExpireAt = user?.tokenExpireAt;
        }
        
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      const counter = getCounter();
      const session2 = {...session, counter};
      console.log(`[callbacks] return session .......... session:`, session2);
      return session2;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
  },

  session: { strategy: 'jwt' },

  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 3600,
  }

};

export default (req, res) => NextAuth(req, res, options);
