
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"

const options = {
  secret: 'any string here',
  providers: [
    GithubProvider({
      clientId: '6324f23cf4c7363f0bba',
      // clientSecret: 'bdb15e2bbaf504997e039b34c739afaa79c68213',
      clientSecret: 'a85292b53bdbefe9590b79c0b3b74200bf355e80'
    }),
  ],
};
export default (req, res) => NextAuth(req, res, options);
