export interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    }
};

export interface PokemonDetails extends Pokemon {
  abilities?: {
    name: string;
    ability: string;
  }[];
};

export interface Details {
  id: number;
  isOpened: boolean;
};