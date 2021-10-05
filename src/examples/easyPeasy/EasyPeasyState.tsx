import { Action, action, createStore, createTypedHooks, StoreProvider, Thunk, thunk } from 'easy-peasy';
import { ExampleComponent } from '../../ExampleComponent/ExampleComponent';
import { Layout } from '../../Layout/Layout';
import { Pokemon, requestPokemon } from '../../services/pokemonService';
import code from './code';

interface PokemonModel {
  callCounter: number;
  pokemon?: Pokemon;
  incrementCounter: Action<PokemonModel, void>;
  loadPokemon: Thunk<PokemonModel, void, void, {}, Promise<void>>;
  setPokemon: Action<PokemonModel, Pokemon>;
}

type StoreModel = {
  poke: PokemonModel;
};

// create fully typed useStore** hooks 👇
const { useStoreActions, useStoreDispatch, useStoreState } = createTypedHooks<StoreModel>();

const pokeModel: PokemonModel = {
  // data
  callCounter: 0,
  pokemon: undefined,
  // actions
  incrementCounter: action((state, payload) => {
    // no copy needed! 'Immer' is used! 👇
    state.callCounter = state.callCounter + 1;
  }),
  setPokemon: action((state, payload) => {
    state.pokemon = payload;
  }),
  // effects / thunks
  loadPokemon: thunk(async (actions, payload) => {
    actions.incrementCounter();
    const pokemon = await requestPokemon();
    actions.setPokemon(pokemon);
  }),
};

const storeModel: StoreModel = {
  poke: pokeModel,
};
// create store with init model 👇
const storeObj = createStore(storeModel);

const usePokemon = () => useStoreState(({ poke }) => poke.pokemon);
const useCallCounter = () => useStoreState(({ poke }) => poke.callCounter);
const useLoadPokemon = () => useStoreActions(state => state.poke.loadPokemon);

export function EasyPeasyState() {
  return (
    <Layout title="Easy Peasy" code={code}>
      <StoreProvider store={storeObj}>
        <Component />
      </StoreProvider>
    </Layout>
  );
}

const Component = () => {
  const pokemon = usePokemon();
  const callCounter = useCallCounter();
  const loadPokemon = useLoadPokemon();
  return <ExampleComponent pokemon={pokemon} callCounter={callCounter} loadPokemon={loadPokemon} />;
};
