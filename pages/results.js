import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Importa NextAuth
import Background from "../components/common/Background";

export default function Results() {
  const { data: session, status } = useSession(); // Obtiene la sesión del usuario
  const accessToken = session?.accessToken; // Extrae el accessToken correctamente
  const router = useRouter();

  const [scores, setScores] = useState(null);
  const [topGenre, setTopGenre] = useState("");
  const [topMoods, setTopMoods] = useState([]);
  const [spotifyQuery, setSpotifyQuery] = useState("");
  const [playlists, setPlaylists] = useState([]); // Estado para almacenar playlists
  const [error, setError] = useState(null); // Manejo de errores

  const genres = [
    "funk",
    "cumbia",
    "country",
    "disco",
    "house",
    "soul jazz",
    "lofi",
    "r&b",
    "reggaeton",
    "pop",
  ];
  const moods = ["happy", "energetic", "mellow", "chill", "calm"];

  useEffect(() => {
    if (!accessToken) {
      setError("Access token is missing.");
      return;
    }
  
    console.log("Access Token in session:", accessToken); // Verifica que el access token esté en la sesión
  
    if (spotifyQuery && accessToken) {
      fetchPlaylists(spotifyQuery, accessToken);
    }
  }, [spotifyQuery, accessToken]);
  
  const fetchPlaylists = async (query, token) => {
    try {
      const encodedQuery = encodeURIComponent(query); // Codifica la query correctamente
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodedQuery}&type=playlist&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Asegúrate que el token sea válido
          },
        }
      );
  
      if (!response.ok) {
        setError(`Spotify API error: ${response.status}`);
        console.error(`Spotify API error: ${response.status}`);
        console.error(await response.text()); // Imprime el mensaje de error
        return;
      }
  
      const data = await response.json();
      const filteredPlaylists = data?.playlists?.items?.filter(
        (item) => item && item.name && item.external_urls?.spotify
      ); // Filtra playlists con nombre y link
  
      if (filteredPlaylists.length === 0) {
        setError("No playlists found. Try a different search.");
      } else {
        setPlaylists(filteredPlaylists.slice(0, 3)); // Toma solo 3 playlists si hay más
      }
    } catch (error) {
      setError("Error fetching playlists.");
      console.error("Error fetching playlists:", error);
    }
  };
  

  if (status === "loading") return <p>Loading session...</p>;
  if (!scores) return <p>Loading results...</p>;
  if (error) return <p className="text-red-500">{error}</p>; // Muestra el mensaje de error

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles/global.css" />
      <div className="relative h-[100vh] flex flex-col justify-center items-center">
        <Background
          width="100%"
          height="100%"
          className="absolute top-0 left-0 z-0"
        />
        <div className="z-10 text-center">
          <h1 className="text-4xl text-white font-bold mb-5">
            Your Quiz Results
          </h1>
          <p className="text-white mb-3">
            <strong>Top Genre:</strong> {topGenre}
          </p>
          <p className="text-white mb-3">
            <strong>Top Moods:</strong> {topMoods.join(", ")}
          </p>
          <p className="text-white mb-3">
            <strong>Spotify Query:</strong> {spotifyQuery}
          </p>

          <h2 className="text-white text-2xl mt-5">Suggested Playlists</h2>
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <p key={playlist.id} className="text-white">
                {playlist.name}
              </p>
            ))
          ) : (
            <p className="text-white">No playlists found</p>
          )}
        </div>
      </div>
    </>
  );
}
