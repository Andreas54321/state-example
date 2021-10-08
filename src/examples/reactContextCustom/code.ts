
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
`// ReactContextCustom.tsx
import { useContext, createContext, useState } from 'react';
import { ExampleComponent } from '../../ExampleComponent/ExampleComponent';
import { Layout } from '../../Layout/Layout';
import { requestPokemon } from '../../services/pokemonService';
import { initStore, StoreType } from '../../store/storeType';
import code from './code';

const ExampleContext = createContext<StoreType>(initStore);
// selector 👇
const useExampleContext = () => useContext(ExampleContext);

export function ReactContextCustom() {
  // effect 👇
  const loadPokemon = async () =>
    requestPokemon().then(
      pokemon => {
        setState(oldState => ({
          ...oldState,
          callCounter: oldState.callCounter + 1,
          pokemon,
        }));
      },
      () => {}
    );
  // create, init store 👇
  const [state, setState] = useState<StoreType>({
    loadPokemon,
    callCounter: 0,
  });

  return (
    <Layout title="React Context Custom" code={code}>
      <ExampleContext.Provider value={state}>
        <Component />
      </ExampleContext.Provider>
    </Layout>
  );
}

const Component = () => {
  const { pokemon, callCounter, loadPokemon } = useExampleContext();
  return <ExampleComponent pokemon={pokemon} callCounter={callCounter} loadPokemon={loadPokemon} />;
};
`];

export default code;
