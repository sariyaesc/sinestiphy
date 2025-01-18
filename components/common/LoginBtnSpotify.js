import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function LoginBtnSpotify({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRedirect = () => {
    if (!session) {
      // Si no está autenticado, inicia sesión
      signIn('spotify');
    } else {
      // Si ya está autenticado, redirige a la página deseada
      router.push('/quiz/1'); // Cambia esto por la ruta a la que quieres redirigir
    }
  };

  return (
    <div>
      <button
        onClick={handleRedirect}
        className="rounded-full bg-green-500 py-3 px-9 drop-shadow-md 
        hover:bg-green-800 hover:opacity-85 transition duration-300"
      >
        <span className="text-white font-semibold">{children}</span>
      </button>
    </div>
  );
}
