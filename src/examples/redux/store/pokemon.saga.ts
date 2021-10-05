import { call, PutEffect, CallEffect, put } from 'redux-saga/effects';
import { Pokemon, requestPokemon } from '../../../services/pokemonService';
import { IFetchPokemonAction, IFetchPokemonSuccessAction, IIncrementCounterAction } from './index';
import * as actions from './pokemon.actions';

type YieldTypes = PutEffect<IIncrementCounterAction> | CallEffect<Pokemon> | PutEffect<IFetchPokemonSuccessAction>;

export function* fetchPokemonSaga(action: IFetchPokemonAction): Generator<YieldTypes, void, Pokemon> {
  yield put(actions.incrementCount());
  try {
    const pokemon = yield call(requestPokemon);
    yield put(actions.fetchPokemonSuccess(pokemon));
  } catch (error) {
    // some error handling
  }
}
