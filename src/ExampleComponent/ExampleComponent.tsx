import { Pokemon } from '../services/pokemonService';

export const ExampleComponent = (props: { pokemon?: Pokemon; callCounter: number; loadPokemon: () => void }) => {
  const { pokemon, callCounter, loadPokemon } = props;
  return (
    <div>
      <p>Calls: {callCounter}</p>
      <button type="button" onClick={loadPokemon}>
        Load
      </button>
      {pokemon && (
        <>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
        </>
      )}
    </div>
  );
};
