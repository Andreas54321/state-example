
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
`// ZustandAutoSelector.tsx
import create from 'zustand';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { ExampleComponent } from '../../ExampleComponent/ExampleComponent';
import { requestPokemon } from '../../services/pokemonService';
import { initStore, StoreType } from '../../store/storeType';
import { Layout } from '../../Layout/Layout';
import code from './code';

const useStoreBase = create<StoreType>(set => ({
  ...initStore,
  loadPokemon: async () => {
    set(oldStore => ({ ...oldStore, callCounter: oldStore.callCounter + 1 }));
    const pokemon = await requestPokemon();
    set(oldStore => ({ ...oldStore, pokemon }));
  },
}));

// wrap your store 👇
const useStore = createSelectorHooks(useStoreBase);
const usePokemon = () => useStore(store => store.pokemon);

export const ZustandContextAutoSelector = () => {
  return (
    <Layout title="Zustand Auto Selector" code={code}>
      <Component />
    </Layout>
  );
};

const Component = () => {
  const pokemon = usePokemon();
  // generated selector hooks 👇, does not work for optional fields ...
  const callCounter = useStore.useCallCounter();
  const loadPokemon = useStore.useLoadPokemon();
  return <ExampleComponent pokemon={pokemon} callCounter={callCounter} loadPokemon={loadPokemon} />;
};
`];

export default code;
