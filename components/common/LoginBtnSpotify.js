import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginBtnSpotify() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn('spotify')}>Iniciar sesión con Spotify</button>
      ) : (
        <div>
          <p>Bienvenido, {session.user.name}</p>
          <button onClick={() => signOut()}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}
