import React from 'react'

import "./pokemon.css";

interface PropsType {
    name: string;
    id: number;
    image: string;
}

const PokemonList: React.FC<PropsType> = (props) => {
    const { name, id, image } = props
  return (
    <div>
        <section className="pokemon-list-container">
            <p className="pokemon">{name}</p>
            <img src={image} alt={name} />
        </section>
    </div>
  )
}

export default PokemonList