// every thing with the path /api/auth/placehodler comes to this routing. square brackets and spread operator gonna capture everything

import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRECT,
		}),
		// add more providers later
	],
});
