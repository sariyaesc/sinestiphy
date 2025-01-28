import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  'user-read-email',
  'playlist-read-private',
  'user-read-private',
].join(',');

const SPOTIFY_AUTHORIZATION_URL = `https://accounts.spotify.com/authorize?scope=${scopes}`;

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: SPOTIFY_AUTHORIZATION_URL,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Guardamos el access token y el refresh token en el JWT
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Hacemos disponible el access token en la sesión
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Ruta personalizada de inicio de sesión (si la tienes)
  },
};

export default NextAuth(authOptions);
