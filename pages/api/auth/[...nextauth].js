//@ts-check
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import LoggerFactory from "../../../lib/logger";

const jwtLogger = LoggerFactory(process.env.LOG_JWT);
const authLogger = LoggerFactory(process.env.LOG_AUTHORIZE);
const sessionLogger = LoggerFactory(process.env.LOG_SESSION);

let counter = 0;
const getCounter = () => {  
    return ++counter;
};

/**
 * Checks if a token is expired.
 *
 * @param {number|undefined} tokenExpireAt - The expiration time of the token in seconds.
 * @return {boolean} True if the token is expired, false otherwise.
 */
const isTokenExpired = (tokenExpireAt) => {
  if (!tokenExpireAt) {
    return false;
  }
  return tokenExpireAt < Math.floor(Date.now() / 1000);
}

/**
 * use jsDoc to declare type extending
 * 
 * 
 * @typedef {import("next-auth").User & UserExtendedPart} RoleUser
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
        authLogger(`try [authorize] login .......... ${email} / ${password}`);
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
          authLogger(`[authorize] return user ..........user:`, user);
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
     * when user signIn or refetchInterval event, this callback will be called.
     * within this callback, we can merge （user, account ）into token at SignIn
     * or we can refresh JWT token at RefetchInterval event.
     * 
     * @param {object} args
     * 
     * @param {import("next-auth/jwt").JWT} args.token
     * @param {RoleUser} args.user 
     * @param {import("next-auth").Account | null} args.account 
     * 
     * @returns {Promise<object>}
     */
    async jwt({ token, user, account }) {

      jwtLogger(`[jwt] >user:`, user, ' >account: ', account, ' >token: ', token);
      
      // "user" is from authorize(), which may provide jwt by external service.
      // "account" provide meta-data as well as access_token (jwt) by Build-in provider.
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
    /**
     * this callback is where we specify what will be available on the client with useSession().
     * 
     * @param {object} args
     * @param {object} args.session - used to stored the token
     * @param {import("next-auth/jwt").JWT & UserExtendedPart} args.token - from jwt callback
     * 
     * @returns {Promise<object>}
     */
    async session({ session, token }) {
      // kill the sesion if token is expired.
      if (isTokenExpired(token?.tokenExpireAt)) {
        throw new Error('token is expired');
      }
      const counter = getCounter();
      const session2 = {...session, user: token, counter};
      sessionLogger(`[callbacks] return session .......... session:`, session2);
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


/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */
export default (req, res) => NextAuth(req, res, options);
