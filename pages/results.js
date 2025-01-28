import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Importa NextAuth
import Background from "../components/common/Background";
import Image from "next/image"

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

  // Extraer y procesar los puntajes del query param
  useEffect(() => {
    if (!router.query.scores) return;

    try {
      const parsedScores = JSON.parse(router.query.scores);
      setScores(parsedScores);

      const genreScores = Object.entries(parsedScores).filter(([key]) =>
        genres.includes(key)
      );
      const moodScores = Object.entries(parsedScores).filter(([key]) =>
        moods.includes(key)
      );

      const topGenreResult = genreScores.reduce(
        (max, curr) => (curr[1] > max[1] ? curr : max),
        ["", 0]
      )[0];
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

  // Buscar playlists en Spotify
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
      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodedQuery}&type=playlist&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setError(`Spotify API error: ${response.status}`);
        console.error(`Spotify API error: ${response.status}`);
        console.error(await response.text());
        return;
      }

      const data = await response.json();
      const filteredPlaylists = data?.playlists?.items?.filter(
        (item) => item && item.name && item.external_urls?.spotify
      );

      if (filteredPlaylists.length === 0) {
        setError("No playlists found. Try a different search.");
      } else {
        setPlaylists(filteredPlaylists.slice(0, 3)); // Asegura que sean 3 playlists
      }
    } catch (error) {
      setError("Error fetching playlists.");
      console.error("Error fetching playlists:", error);
    }
  };

  if (status === "loading") return <p>Loading session...</p>;
  if (!scores) return <p>Loading results...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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
        <div className="relative z-10 w-4/5 grid grid-cols-2 gap-10">
          {/* Columna izquierda: Texto */}
          <div className="flex flex-col justify-center">
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
          </div>

          {/* Columna derecha: Tarjetas de playlists */}
          <div className="grid grid-rows-3 gap-5 w-full max-w-lg">
  {playlists.map((playlist) => (
    <a
      key={playlist.id}
      href={playlist.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform w-full"
    >
      <div className="relative w-32 h-32">
        <img
          src={playlist.images?.[0]?.url || "/placeholder.jpg"}
          alt={playlist.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-3 flex-1">
        <h3 className="text-lg font-semibold">{playlist.name}</h3>
      </div>
    </a>
  ))}
</div>
        </div>
      </div>
    </>
  );
}