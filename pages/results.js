import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";  // Importa NextAuth
import Background from "../components/common/Background";

export default function Results() {
  const { data: session } = useSession(); // Obtiene la sesión del usuario
  const accessToken = session?.accessToken; // Extrae el accessToken
  const router = useRouter();
  const [scores, setScores] = useState(null);
  const [topGenre, setTopGenre] = useState("");
  const [topMoods, setTopMoods] = useState([]);
  const [spotifyQuery, setSpotifyQuery] = useState("");

  const genres = ["funk", "cumbia", "country", "disco", "house", "soul jazz", "lofi", "r&b", "reggaeton", "pop"];
  const moods = ["happy", "energetic", "mellow", "chill", "calm"];

  useEffect(() => {
    if (router.query.scores) {
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
    }
  }, [router.query.scores,genres,moods]);

  useEffect(() => {
    if (spotifyQuery && accessToken) {
      fetchPlaylists(spotifyQuery, accessToken);
    }
  }, [spotifyQuery, accessToken]);

  const fetchPlaylists = async (query, token) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&market=ES&limit=3&offset=0`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log("Spotify Playlists:", data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  if (!scores) return <p>Loading results...</p>;

  return (
    <div className="relative h-[100vh] flex flex-col justify-center items-center">
      <Background width="100%" height="100%" className="absolute top-0 left-0 z-0" />
      <div className="z-10 text-center">
        <h1 className="text-4xl text-white font-bold mb-5">Your Quiz Results</h1>
        <p className="text-white mb-3"><strong>Top Genre:</strong> {topGenre}</p>
        <p className="text-white mb-3"><strong>Top Moods:</strong> {topMoods.join(", ")}</p>
        <p className="text-white mb-3"><strong>Spotify Query:</strong> {spotifyQuery}</p>
      </div>
    </div>
  );
}
