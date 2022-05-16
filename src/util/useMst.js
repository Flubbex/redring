import { Instance } from "mobx-state-tree";
import { createContext, useContext } from "react";

import game from "../model/game";

const rootInstance = game.create();

const rootStoreContext = createContext(rootInstance);
const Provider = rootStoreContext.Provider;

export { rootInstance, Provider };

export default () => {
  const store = useContext(rootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
};
