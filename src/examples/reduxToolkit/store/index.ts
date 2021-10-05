import { Action } from 'redux';
import { Pokemon } from '../../../services/pokemonService';
import ActionTypeKeys from './pokemon.actionTypeKeys';
import keys from './pokemon.actionTypeKeys';

export interface IFetchPokemonAction extends Action<ActionTypeKeys> {
  readonly type: keys.FETCH_POKEMON;
  readonly payload: undefined;
}
export interface IFetchPokemonSuccessAction extends Action<ActionTypeKeys> {
  readonly type: keys.FETCH_POKEMON_SUCCESS;
  readonly payload: Pokemon;
}
export interface IIncrementCounterAction extends Action<ActionTypeKeys> {
  readonly type: keys.INCREMENT_COUNT;
  readonly payload: undefined;
}

type ActionTypes = IFetchPokemonAction | IFetchPokemonSuccessAction | IIncrementCounterAction;
export default ActionTypes;
