
const code = [
`// RecoilState.tsx
import { useCallback } from 'react';
import { RecoilRoot, atom, useRecoilState } from 'recoil';
import { ExampleComponent } from '../../ExampleComponent/ExampleComponent';
import { Layout } from '../../Layout/Layout';
import { Pokemon, requestPokemon } from '../../services/pokemonService';
import code from './code';

const callCounterState = atom<number>({
  key: 'count',
  default: 0,
});

// 👆 global atom definition 👇
const pokemonState = atom<Pokemon | undefined>({
  key: 'pokemon',
  default: undefined,
});

export function RecoilState() {
  return (
    <Layout title="Recoil State" code={code}>
      <RecoilRoot>
        <Component />
      </RecoilRoot>
    </Layout>
  );
}

const Component = () => {
  // like a global useState ... 👇
  const [pokemon, setPokemon] = useRecoilState(pokemonState);
  const [callCounter, setCount] = useRecoilState(callCounterState);
  const loadPokemon = useCallback(() => {
    setCount((old: number) => old + 1);
    requestPokemon().then(
      result => {
        setPokemon(result);
      },
      () => {}
    );
  }, [setCount, setPokemon]);

  return (
    <ExampleComponent pokemon={pokemon as Pokemon} callCounter={callCounter as number} loadPokemon={loadPokemon} />
  );
};

// 'jotai' is quite similar..
`];

export default code;
