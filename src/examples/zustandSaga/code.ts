
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
`// ZustandSaga.tsx
import create from 'zustand';
import { takeEvery } from 'redux-saga/effects';
import sagaMiddleware, { setState } from 'zustand-saga';
import { ExampleComponent } from '../../ExampleComponent/ExampleComponent';
import { Pokemon, requestPokemon } from '../../services/pokemonService';
import { initStore, StoreType } from '../../store/storeType';
import code from './code';
import { Layout } from '../../Layout/Layout';

const LOAD_POKEMON = 'LOAD_POKEMON';

type SagaStoreType = StoreType & { putActionToSaga: (action: { type: string }) => void };

const useStore = create<StoreType>(
  // 👇 here comes saga
  sagaMiddleware(saga, (set, get, store: SagaStoreType) => ({
    ...initStore,
    loadPokemon: () => store.putActionToSaga({ type: LOAD_POKEMON }),
  }))
);
// 👇 take events
function* saga() {
  yield takeEvery(LOAD_POKEMON, loadPokemonEffect);
}

function* loadPokemonEffect({ type }: { type: string }) {
  yield setState((oldState: StoreType) => ({ callCounter: oldState.callCounter + 1 }));
  const pokemon: Pokemon = yield requestPokemon();
  yield setState((oldState: StoreType) => ({ pokemon }));
}

const usePokemon = () => useStore(store => store.pokemon);
const useCallCounter = () => useStore(store => store.callCounter);
const useLoadPokemon = () => useStore(store => store.loadPokemon);

export function ZustandSaga() {
  return (
    <Layout title="Zustand Saga" code={code}>
      <Component />
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
