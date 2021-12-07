import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  getPokemon,
} from "../src/redux/actions";
import * as data from "../../db.json";

describe("Actions", () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({ houses: [] });

  beforeEach(() => store.clearActions());

  describe("getPokemons", () => {
    it('Debería hacer un dispatch con las propiedades type "GET_POKEMONS" y como payload, el resultado del fetch al link provisto', async () => {
      return store
        .dispatch(getPokemons())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].payload.results.length).toBe(12);
          expect(actions[0]).toEqual({
            type: "GET_POKEMONS",
            payload: data.results,
          });
        })
        .catch((err) => {
          console.error(err);
          expect(err).toBeUndefined();
        });
    });
  });

});
