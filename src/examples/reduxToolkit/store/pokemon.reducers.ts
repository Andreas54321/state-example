import { createReducer } from '@reduxjs/toolkit';
import { initStore } from '../../../store/storeType';
import { fetchPokemonSuccess, incrementCount } from './pokemon.actions';

// No switch anymore 👇
const reducer = createReducer(initStore, builder => {
  builder.addCase(fetchPokemonSuccess, (state, action) => {
    state.pokemon = action.payload;
  });

  builder.addCase(incrementCount, (state, action) => {
    state.callCounter = state.callCounter + 1;
  });
});

export default reducer;
