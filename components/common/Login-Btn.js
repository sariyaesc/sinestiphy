import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-modify-public%20playlist-modify-private`,
      token: 'https://accounts.spotify.com/api/token',
      userinfo: 'https://api.spotify.com/v1/me',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token; // Guarda el access token en el token JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken; // Accede al token de la sesión
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Asegúrate de que la ruta sea la correcta
  },
};

export default NextAuth(authOptions);
