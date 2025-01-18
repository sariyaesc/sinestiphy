import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import SpotifyProvider from 'next-auth/providers/spotify';

const scopes = [
    'user-read-email',
    'playlist-read-private',
    'user-read-private',
  ].join(',');
  
  const SPOTIFY_AUTHORIZATION_URL = 
    `https://accounts.spotify.com/authorize?scope=${scopes}`;

export const authOptions={
    providers:[
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: SPOTIFY_AUTHORIZATION_URL,
          })    
    ],
    callbacks: {
        async jwt({ token, account }) {
          if (account) {
            token.accessToken = account.access_token;
            token.refreshToken = account.refresh_token;
          }
          return token;
        },
        async redirect({ url, baseUrl }) {
            return `${baseUrl}/quiz/1`;
}}}

export default NextAuth(authOptions)