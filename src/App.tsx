import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./App.css";

//Components
import PokemonCollection from './components/PokemonCollection';
import { Pokemon } from './interfaces';

const App:React.FC = () => {
  const [ pokemons, setPokemons ] = useState<Pokemon[]>([]);
  const [ nextUrl, setNextUrl ] = useState<string>("");

  interface PokemonObject {
    name: string;
    url: string;
  }



  useEffect(() => {
    const getPokemon = async () => {
      const resp = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");

      setNextUrl(resp.data.next);

      resp.data.results.forEach(async(pokemon: PokemonObject) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        setPokemons(prev => [...prev, poke.data])
      });

    };

    getPokemon()
  }, []);

  const loadMore = async () => {
    const resp = await axios.get(nextUrl);

    resp.data.results.forEach(async(pokemon: PokemonObject) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons(prev => [...prev, poke.data]);
    })
  }

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection pokemons={pokemons}/>

        <div>
          <button className="btn" onClick={loadMore}>
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
