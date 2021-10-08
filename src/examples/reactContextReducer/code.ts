
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
`// ReactContextReducer.tsx
/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import { useContext, createContext, useReducer } from 'react';
import { ExampleComponent } from '../../ExampleComponent/ExampleComponent';
import { Layout } from '../../Layout/Layout';
import { Pokemon, requestPokemon } from '../../services/pokemonService';
import { initStore, StoreType } from '../../store/storeType';
import code from './code';

const ExampleContext = createContext<[StoreType, React.Dispatch<ActionTypes>]>([initStore, () => {}]);

const useExampleContext = () => useContext(ExampleContext);

type LoadAction = { type: 'SET_POKEMON'; payload: Pokemon };
type ActionTypes = LoadAction;

const appReducer = (state: StoreType, action: ActionTypes) => {
  switch (action.type) {
    case 'SET_POKEMON':
      return { ...state, pokemon: action.payload };
    default:
      return state;
  }
};

export function ReactContextReducer() {
  // effect 👇
  const loadPokemon = async () =>
    requestPokemon().then(
      pokemon => dispatch({ type: 'SET_POKEMON', payload: pokemon }),
      () => {}
    );
  // create store and bind reducer 👇
  const [state, dispatch] = useReducer(appReducer, { ...initStore, loadPokemon });

  return (
    <Layout title="React Context Reducer" code={code}>
      <ExampleContext.Provider value={[state, dispatch]}>
        <Component />
      </ExampleContext.Provider>
    </Layout>
  );
}

const Component = () => {
  const [state, dispatch] = useExampleContext();
  const { pokemon, callCounter, loadPokemon } = state;
  return <ExampleComponent pokemon={pokemon} callCounter={callCounter} loadPokemon={loadPokemon} />;
};
`];

export default code;
