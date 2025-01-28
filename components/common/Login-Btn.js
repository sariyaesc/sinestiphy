import { signIn } from 'next-auth/react';

const LoginButton = () => {
  const handleLogin = () => {
    signIn('spotify'); // Inicia sesión con el proveedor de Spotify
  };

  return (
    <button onClick={handleLogin}>Login with Spotify</button>
  );
};

export default LoginButton;