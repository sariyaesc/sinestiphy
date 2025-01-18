import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Background from "../components/common/Background";

export default function Results() {
  const router = useRouter();
  const [scores, setScores] = useState(null);
  const [topGenre, setTopGenre] = useState("");
  const [topMoods, setTopMoods] = useState([]);
  const [spotifyQuery, setSpotifyQuery] = useState("");

  // Definir géneros y moods disponibles
  const genres = ["funk", "cumbia", "country", "disco", "house", "soul jazz", "lofi", "r&b", "reggaeton", "pop"];
  const moods = ["happy", "energetic", "mellow", "chill", "calm"];

  useEffect(() => {
    if (router.query.scores) {
      // Parsear los puntajes enviados desde el quiz
      const parsedScores = JSON.parse(router.query.scores);
      setScores(parsedScores);

      // Filtrar géneros y moods de los puntajes
      const genreScores = Object.entries(parsedScores).filter(([key]) => genres.includes(key));
      const moodScores = Object.entries(parsedScores).filter(([key]) => moods.includes(key));

      // Obtener el género con el puntaje más alto
      const topGenreResult = genreScores.reduce((max, curr) => (curr[1] > max[1] ? curr : max), ["", 0])[0];
      setTopGenre(topGenreResult);

      // Ordenar los moods por puntaje y seleccionar los dos primeros
      const topMoodsResult = moodScores
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([key]) => key);
      setTopMoods(topMoodsResult);

      // Crear la consulta para Spotify
      setSpotifyQuery(`${topGenreResult} ${topMoodsResult.join(" ")}`);
    }
  }, [router.query.scores]);

  if (!scores) return <p>Loading results...</p>;

  return (
    <div className="relative h-[100vh] flex flex-col justify-center items-center">
      <Background width="100%" height="100%" className="absolute top-0 left-0 z-0 brightness-75" />

      <div className="z-10 text-center">
        <h1 className="text-4xl text-white font-bold mb-5">Your Quiz Results</h1>
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
    </div>
  );
}
