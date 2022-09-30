import React, { useState, useEffect }  from 'react'
import { Details } from '../interfaces';

import "./pokemon.css";

interface PropsType {
    viewDetails: Details;
    setViewDetails: React.Dispatch<React.SetStateAction<Details>>;
    name: string;
    id: number;
    image: string;
    abilities: {
        name: string;
        ability: string;
    }[] | undefined;
}

const PokemonList: React.FC<PropsType> = (props) => {
    const { viewDetails, setViewDetails, name, id, image, abilities } = props;
    const [ isSelected, setSelected ] = useState<boolean>(false);

    useEffect(() => {
        console.log("run")
        setSelected(id === viewDetails.id);
    }, [viewDetails])
    
    const handleClose = (id: number) => {
        setViewDetails({
            id: 0,
            isOpened: false
        })
    }
    
  return (
      <div>
        {isSelected && (
            <section className="pokemon-list-detailed">
                <div className="detail-container">
                    <p className="detail-close" onClick={() => handleClose(id)}>X</p>
                    <div className="detail-info">
                        <img src={image} alt={name} className="detail-img" />
                        <p className="detail-name">{name}</p>
                        <p>{isSelected ? "show": "hide"}</p>
                    </div>
                    <div className="detail-skill">
                        <div className="detail-ability">
                            Abilities:
                            {abilities?.map((ab: any, index) => {
                                return (
                                    <div key={index}>{ab.ability.name}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        )}
        <section className="pokemon-list-container">
            <p className="pokemon">{name}</p>
            <img src={image} alt={name} />
        </section>
    </div>
  )
}

export default PokemonList