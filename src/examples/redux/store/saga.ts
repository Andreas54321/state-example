import { all, takeEvery } from 'redux-saga/effects';
import keys from './pokemon.actionTypeKeys';
import { fetchPokemonSaga } from './pokemon.saga';

export function* watchPokemon() {
  yield all([takeEvery(keys.FETCH_POKEMON, fetchPokemonSaga)]);
}
