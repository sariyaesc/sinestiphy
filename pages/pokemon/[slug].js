import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PokemonDetails() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(null);
  const router = useRouter();
  const { slug } = router.query; // const slug = router.query.slug

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${slug}`
        );
        setPokemon(response.data);
      } catch (error) {
        console.error("error trayendo pokemon", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [slug]);

  if (loading) return <div>Cargando...</div>;
  if (!pokemon) return <div>Pokemon no encontrado</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white text-black rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Imagen del Pokémon */}
        <div>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-full h-auto"
          />
        </div>
        {/* Estadísticas del Pokémon */}
        <div>
          <div className="mb-2">
            <h2 className="text-xl font-semibold mb-2">Estadísticas</h2>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="mb-2">
                <span className="capitalize font-medium">{stat.stat.name}:</span>{" "}
                {stat.base_stat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}