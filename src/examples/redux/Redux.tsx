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
