import { call, PutEffect, CallEffect, put } from 'redux-saga/effects';
import { Pokemon, requestPokemon } from '../../../services/pokemonService';
import { IFetchPokemonAction } from './index';
import * as actions from './pokemon.actions';

type YieldTypes = PutEffect<{ payload: undefined | Pokemon; type: string }> | CallEffect<Pokemon>;

export function* fetchPokemonSaga(action: IFetchPokemonAction): Generator<YieldTypes, void, Pokemon> {
  const x = actions.incrementCount();
  yield put(x);
  try {
    const pokemon = yield call(requestPokemon);
    yield put(actions.fetchPokemonSuccess(pokemon));
  } catch (error) {
    // some error handling
  }
}
