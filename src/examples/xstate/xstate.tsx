import { useMachine } from '@xstate/react';
import { assign, createMachine, interpret } from 'xstate';
import { ExampleComponent } from '../../ExampleComponent/ExampleComponent';
import { Layout } from '../../Layout/Layout';
import { requestPokemon } from '../../services/pokemonService';
import { initStore, StoreType } from '../../store/storeType';
import code from './code';

const machine = createMachine<StoreType>({
  id: 'pokemon',
  initial: 'idle',
  context: {
    ...initStore,
    pokemon: undefined,
    callCounter: 0,
  },
  states: {
    idle: {
      on: {
        LOAD: 'loadingPokemon',
      },
    },
    loadingPokemon: {
      invoke: {
        id: 'getPokemon',
        src: (context, event) => requestPokemon(),
        onDone: {
          target: 'success',
          actions: assign((context, event) => {
            return {
              pokemon: event.data,
              callCounter: context.callCounter + 1,
            };
          }),
        },
        onError: {
          target: 'failure',
          actions: assign({ pokemon: (context, event) => undefined }),
        },
      },
      on: {
        RESOLVE: 'success',
        RECECT: 'failure',
      },
    },
    success: {
      on: { LOAD: 'loadingPokemon' },
    },
    failure: {
      on: { LOAD: 'loadingPokemon' },
    },
  },
});

const promiseService = interpret(machine).onTransition(state => console.log(state.value));

// Start the service
promiseService.start();
// => 'pending'

export function XState() {
  return (
    <Layout title="XState" code={code}>
      <Component />
    </Layout>
  );
}

const Component = () => {
  const [state, sendMachine] = useMachine(machine, {});
  const pokemon = state.context.pokemon;
  const callCounter = state.context.callCounter;
  const loadPokemon = () => sendMachine('LOAD', {});
  return <ExampleComponent pokemon={pokemon} callCounter={callCounter} loadPokemon={loadPokemon} />;
};
