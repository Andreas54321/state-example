
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
}
export interface IFetchPokemonSuccessAction extends Action<ActionTypeKeys> {
  readonly type: keys.FETCH_POKEMON_SUCCESS;
  readonly pokemon: Pokemon;
}
export interface IIncrementCounterAction extends Action<ActionTypeKeys> {
  readonly type: keys.INCREMENT_COUNT;
}

type ActionTypes = IFetchPokemonAction | IFetchPokemonSuccessAction | IIncrementCounterAction;
export default ActionTypes;
`, `// store/pokemon.actions.ts
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
`, `// store/pokemon.reducers.ts
import { initStore } from '../../../store/storeType';
import ActionTypes from './index';
import keys from './pokemon.actionTypeKeys';

const reducer = (state = initStore, action: ActionTypes) => {
  switch (action.type) {
    case keys.FETCH_POKEMON_SUCCESS:
      return { ...state, pokemon: action.pokemon };
    case keys.INCREMENT_COUNT:
      return { ...state, callCounter: state.callCounter + 1 };
    default:
      return state;
  }
};

export default reducer;
`, `// Redux.tsx
import { useCallback } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, compose, createStore, Dispatch } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { ExampleComponent } from '../../ExampleComponent/ExampleComponent';
import { Layout } from '../../Layout/Layout';
import { Pokemon } from '../../services/pokemonService';
import { StoreType } from '../../store/storeType';
import code from './code';
import ActionTypes from './store';
import { fetchPokemon } from './store/pokemon.actions';
import pokemonReducer from './store/pokemon.reducers';
import { watchPokemon } from './store/saga';

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-underscore-dangle, @typescript-eslint/no-explicit-any
  process.env.NODE_ENV === 'development' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(pokemonReducer, (composeEnhancers || compose)(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchPokemon);

const usePokemon = () => useSelector<StoreType, Pokemon | undefined>(x => x.pokemon);
const useCallCounter = () => useSelector<StoreType, number>(({ callCounter }) => callCounter);
const useLoadPokemon = () => {
  const dispatch = useDispatch<Dispatch<ActionTypes>>();
  return useCallback(() => dispatch(fetchPokemon()), [dispatch]);
};

export function ReduxState() {
  return (
    <Layout title="Redux" code={code}>
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
