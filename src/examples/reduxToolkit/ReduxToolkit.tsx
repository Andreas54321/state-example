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
