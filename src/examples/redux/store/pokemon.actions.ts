import { Pokemon } from '../../../services/pokemonService';
import * as types from './index';
import keys from './pokemon.actionTypeKeys';

export function fetchPokemon(): types.IFetchPokemonAction {
  return { type: keys.FETCH_POKEMON };
}
export function fetchPokemonSuccess(pokemon: Pokemon): types.IFetchPokemonSuccessAction {
  return { type: keys.FETCH_POKEMON_SUCCESS, pokemon };
}
export function incrementCount(): types.IIncrementCounterAction {
  return { type: keys.INCREMENT_COUNT };
}
