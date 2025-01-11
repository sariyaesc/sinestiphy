import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link"; //para mandar a llamar paginas

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        setPokemons(response.data.results);
      } catch (error) {
        console.error("error trayendo pokemons", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pokedex</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon, index) => (
          <Link href={`/pokemon/${index + 1}`} key={pokemon.name}>
            <div
              className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl
                        transition-shadow cursor-pointer">
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index+1}.png`} alt={pokemon.name}>
                            </img>

                            <h2 className="text-xl gont-semibold capitalize text-center mt-2 text-black">
                                {pokemon.name}
                            </h2>
                        </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
