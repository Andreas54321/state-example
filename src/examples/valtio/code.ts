
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
`// ValtioProxyState.tsx
import { proxy, useSnapshot } from 'valtio';
import { ExampleComponent } from '../../ExampleComponent/ExampleComponent';
import { Layout } from '../../Layout/Layout';
import { requestPokemon } from '../../services/pokemonService';
import { initStore, StoreType } from '../../store/storeType';
import code from './code';

const loadPokemonEffect = async () => {
  state.callCounter = state.callCounter + 1;
  const pokemon = await requestPokemon();
  state.pokemon = pokemon;
};

// proxy given state, observe changes
const state = proxy<StoreType>({ ...initStore, loadPokemon: loadPokemonEffect });

const usePokemon = () => useSnapshot(state).pokemon;
const useCallCounter = () => useSnapshot(state).callCounter;
const useLoadPokemon = () => useSnapshot(state).loadPokemon;

export function ValtioProxyState() {
  return (
    <Layout title="Valtio Proxy State" code={code}>
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
