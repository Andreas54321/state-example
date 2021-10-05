
const code = [
`// storeType.ts
import { Pokemon } from '../services/pokemonService';

export type StoreType = {
  pokemon?: Pokemon;
  callCounter: number;
  loadPokemon: () => void;
};

export const initStore: StoreType = {
  loadPokemon: () => {},
  callCounter: 0,
};
`];

export default code;
