import { createAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../../services/pokemonService';
import keys from './pokemon.actionTypeKeys';

// create action by util method 👇
export const fetchPokemon = createAction<void>(keys.FETCH_POKEMON);
export const fetchPokemonSuccess = createAction<Pokemon>(keys.FETCH_POKEMON_SUCCESS);
export const incrementCount = createAction<void>(keys.INCREMENT_COUNT);
