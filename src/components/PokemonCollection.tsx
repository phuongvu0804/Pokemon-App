import React from 'react'

//Components
import PokemonList from './PokemonList';

//Types
import { Pokemon } from '../interfaces';

import "./pokemon.css";

interface PropsType {
    pokemons: Pokemon[];
}

const PokemonCollection: React.FC<PropsType> = (props) => {
    const { pokemons } = props;
  return (
    <div>
        <section className="collection-container">
            {pokemons.map((pokemon, index) => {
                return (
                    <PokemonList
                        key={index}
                        name={pokemon.name}
                        id={pokemon.id}
                        image={pokemon.sprites.front_default}
                    />
                )
            })}
        </section>
    </div>
  )
}

export default PokemonCollection