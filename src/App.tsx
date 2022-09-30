import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./App.css";

//Components
import PokemonCollection from './components/PokemonCollection';
import { Details, Pokemon } from './interfaces';

const App:React.FC = () => {
  const [ pokemons, setPokemons ] = useState<Pokemon[]>([]);
  const [ nextUrl, setNextUrl ] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ viewDetails, setViewDetails ] = useState<Details>({
    id: 0,
    isOpened: false,
  });

  interface PokemonObject {
    name: string;
    url: string;
  };

  useEffect(() => {
    const getPokemon = async () => {
      const resp = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");

      setNextUrl(resp.data.next);

      resp.data.results.forEach(async(pokemon: PokemonObject) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        setPokemons(prev => [...prev, poke.data]);
      });

     setLoading(false);
    };

    getPokemon()
  }, []);

  const loadMore = async () => {
    setLoading(true);
    const resp = await axios.get(nextUrl);

    resp.data.results.forEach(async(pokemon: PokemonObject) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons(prev => [...prev, poke.data]);
    })
   setLoading(false);

  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>

        <PokemonCollection 
          pokemons={pokemons}
          viewDetails={viewDetails}
          setViewDetails={setViewDetails}
        />

        { !viewDetails.isOpened && (
          <div>
            {loading ? (
              <button className="btn">Loading...</button>
            ) : (
              <button className="btn" onClick={loadMore}>
                Load more
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
