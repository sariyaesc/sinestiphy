import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";  // Importa NextAuth
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

  const genres = ["funk", "cumbia", "country", "disco", "house", "soul jazz", "lofi", "r&b", "reggaeton", "pop"];
  const moods = ["happy", "energetic", "mellow", "chill", "calm"];

  useEffect(() => {
    if (!router.query.scores) return;

    try {
      const parsedScores = JSON.parse(router.query.scores);
      setScores(parsedScores);

      const genreScores = Object.entries(parsedScores).filter(([key]) => genres.includes(key));
      const moodScores = Object.entries(parsedScores).filter(([key]) => moods.includes(key));

      const topGenreResult = genreScores.reduce((max, curr) => (curr[1] > max[1] ? curr : max), ["", 0])[0];
      setTopGenre(topGenreResult);

      const topMoodsResult = moodScores
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([key]) => key);
      setTopMoods(topMoodsResult);

      setSpotifyQuery(`${topGenreResult} ${topMoodsResult.join(" ")}`);
    } catch (error) {
      setError("Error parsing scores.");
      console.error("Error parsing scores:", error);
    }
  }, [router.query.scores]);

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
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=playlist&limit=3`, {
        headers: {
          Authorization: `Bearer ${token}` // Asegúrate que el token sea válido
        }
      });

      if (!response.ok) {
        setError(`Error de Spotify API: ${response.status}`);
        console.error(`Error de Spotify API: ${response.status}`);
        console.error(await response.text()); // Imprime el mensaje de error
        return;
      }

      const data = await response.json();
      // Filtramos las playlists no válidas
      setPlaylists(data?.playlists?.items?.filter(item => item && item.name) || []);
    } catch (error) {
      setError("Error fetching playlists.");
      console.error("Error fetching playlists:", error);
    }
  };

  if (status === "loading") return <p>Loading session...</p>;
  if (!scores) return <p>Loading results...</p>;
  if (error) return <p className="text-red-500">{error}</p>; // Muestra el mensaje de error

  return (
    <div className="relative h-[100vh] flex flex-col justify-center items-center">
      <Background width="100%" height="100%" className="absolute top-0 left-0 z-0" />
      <div className="z-10 text-center">
        <h1 className="text-4xl text-white font-bold mb-5">Your Quiz Results</h1>
        <p className="text-white mb-3"><strong>Top Genre:</strong> {topGenre}</p>
        <p className="text-white mb-3"><strong>Top Moods:</strong> {topMoods.join(", ")}</p>
        <p className="text-white mb-3"><strong>Spotify Query:</strong> {spotifyQuery}</p>

        {/* Muestra el accessToken */}
        <p className="text-white mb-3"><strong>Access Token:</strong> {accessToken}</p>

        <h2 className="text-white text-2xl mt-5">Suggested Playlists</h2>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <p key={playlist.id} className="text-white">{playlist.name}</p>
          ))
        ) : (
          <p className="text-white">No playlists found</p>
        )}
      </div>
    </div>
  );
}
