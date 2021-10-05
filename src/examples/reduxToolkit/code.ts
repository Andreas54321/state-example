
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
`, 
`// store/pokemon.actionTypeKeys.ts
enum ActionTypeKeys {
  FETCH_POKEMON = 'FETCH_POKEMON',
  FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS',

  INCREMENT_COUNT = 'INCREMENT_COUNT',
}
export default ActionTypeKeys;
`, `// store/index.ts
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
`, `// store/pokemon.actions.ts
import { createAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../../services/pokemonService';
import keys from './pokemon.actionTypeKeys';

// create action by util method 👇
export const fetchPokemon = createAction<void>(keys.FETCH_POKEMON);
export const fetchPokemonSuccess = createAction<Pokemon>(keys.FETCH_POKEMON_SUCCESS);
export const incrementCount = createAction<void>(keys.INCREMENT_COUNT);
`, `// store/saga.ts
import { all, takeEvery } from 'redux-saga/effects';
import keys from './pokemon.actionTypeKeys';
import { fetchPokemonSaga } from './pokemon.saga';

export function* watchPokemon() {
  yield all([takeEvery(keys.FETCH_POKEMON, fetchPokemonSaga)]);
}
`, `// store/pokemon.saga.ts
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
`, `// store/pokemon.reducers.ts
import { createReducer } from '@reduxjs/toolkit';
import { initStore } from '../../../store/storeType';
import { fetchPokemonSuccess, incrementCount } from './pokemon.actions';

// No switch anymore 👇
const reducer = createReducer(initStore, builder => {
  builder.addCase(fetchPokemonSuccess, (state, action) => {
    state.pokemon = action.payload;
  });

  builder.addCase(incrementCount, (state, action) => {
    state.callCounter = state.callCounter + 1;
  });
});

export default reducer;
`, `// ReduxToolkit.tsx
import { useCallback } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { ExampleComponent } from '../../ExampleComponent/ExampleComponent';
import { Pokemon } from '../../services/pokemonService';
import { fetchPokemon } from './store/pokemon.actions';
import pokemonReducer from './store/pokemon.reducers';
import { watchPokemon } from './store/saga';
import { Layout } from '../../Layout/Layout';
import code from './code';

const sagaMiddleware = createSagaMiddleware();

// simplified store 👇
const store = configureStore({
  reducer: pokemonReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(watchPokemon);

const usePokemon = () => useSelector<RootState, Pokemon | undefined>(x => x.pokemon);
const useCallCounter = () => useSelector<RootState, number>(({ callCounter }) => callCounter);
const useLoadPokemon = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);
};

export function ReduxToolkit() {
  return (
    <Layout title="Redux Toolkit" code={code}>
      <Provider store={store}>
        <Component />
      </Provider>
    </Layout>
  );
}

const Component = () => {
  const pokemon = usePokemon();
  const callCounter = useCallCounter();
  const loadPokemon = useLoadPokemon();
  return <ExampleComponent pokemon={pokemon} callCounter={callCounter} loadPokemon={loadPokemon} />;
};
`];

export default code;
