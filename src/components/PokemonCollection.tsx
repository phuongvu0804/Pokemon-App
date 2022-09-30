import React from 'react'

//Components
import PokemonList from './PokemonList';

//Types
import { Details, PokemonDetails } from '../interfaces';

import "./pokemon.css";

interface PropsType {
    pokemons: PokemonDetails[];
    viewDetails: Details;
    setViewDetails: React.Dispatch<React.SetStateAction<Details>>;
}

const PokemonCollection: React.FC<PropsType> = (props) => {
    const { pokemons, viewDetails, setViewDetails } = props;

    const selectPokemon = (selected: number) => {
        if (!viewDetails.isOpened) {
            setViewDetails({
                id: selected,
                isOpened: true
            });
        };

    };

  return (
    <>
        <section className={viewDetails.isOpened ? "collection-container-active" : "collection-container"}>
            {viewDetails.isOpened && (
                <div className="overlay"></div>
            )}
            {pokemons.map((pokemon, index) => {
                return (
                    <div key={index} onClick={() => selectPokemon(pokemon.id)}>
                        <PokemonList
                            viewDetails={viewDetails}
                            setViewDetails={setViewDetails}
                            name={pokemon.name}
                            id={pokemon.id}
                            image={pokemon.sprites.front_default}
                            abilities={pokemon.abilities}
                        />
                    </div>
                )
            })}
        </section>
    </>
  )
}

export default PokemonCollection