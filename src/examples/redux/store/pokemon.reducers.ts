import { initStore } from '../../../store/storeType';
import ActionTypes from './index';
import keys from './pokemon.actionTypeKeys';

const reducer = (state = initStore, action: ActionTypes) => {
  switch (action.type) {
    case keys.FETCH_POKEMON_SUCCESS:
      return { ...state, pokemon: action.pokemon };
    case keys.INCREMENT_COUNT:
      return { ...state, callCounter: state.callCounter + 1 };
    default:
      return state;
  }
};

export default reducer;
