
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
`// ZustandContext.tsx
import create from 'zustand';
import { ExampleComponent } from '../../ExampleComponent/ExampleComponent';
import { Layout } from '../../Layout/Layout';
import { requestPokemon } from '../../services/pokemonService';
import { initStore, StoreType } from '../../store/storeType';
import code from './code';

const useStore = create<StoreType>(set => ({
  ...initStore,
  loadPokemon: async () => {
    set(oldStore => ({ ...oldStore, callCounter: oldStore.callCounter + 1 }));
    const pokemon = await requestPokemon();
    set(oldStore => ({ ...oldStore, pokemon }));
  },
}));

const usePokemon = () => useStore(store => store.pokemon);
const useCallCounter = () => useStore(store => store.callCounter);
const useLoadPokemon = () => useStore(store => store.loadPokemon);

export function ZustandContext() {
  return (
    <Layout title="Zustand Context" code={code}>
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
