import axios from 'axios';

export type Pokemon = {
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
};

export const requestPokemon = async (): Promise<Pokemon> => {
  const no = Math.round(Math.random() * 10000) % 100;
  const { data } = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${no}`);
  //   await new Promise(resolve => {
  //     setTimeout(() => resolve(true), 500);
  //   });
  return data;
};
