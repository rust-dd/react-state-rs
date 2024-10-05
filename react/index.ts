import { useSyncExternalStore } from "react";
import init, { State } from "./wasm/react_state_rs";

await init({});

function createStore(initialState: any) {
  const store = new State(initialState);

  const subscribers = new Set<() => void>();

  const getSnapshot = () => store;

  const subscribe = (callback: () => void) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  };

  const notify = () => {
    subscribers.forEach((callback) => callback());
  };

  const updateStore = (newState: any) => {
    store.set(newState); // Frissíti az állapotot
    notify(); // Értesít minden feliratkozót
  };

  const updateKey = (key: string, value: any) => {
    store.update(key, value);
    notify(); // Értesítés minden feliratkozónak
  };

  const useStore = () => {
    return useSyncExternalStore(subscribe, getSnapshot);
  };

  const useSelector = (selector: (state: any) => any) => {
    return useSyncExternalStore(subscribe, () => selector(store.get()));
  };

  return {
    useStore,
    useSelector,
    get: () => store.get(),
    getKey: (key: string) => store.get_key(key),
    set: (newState: any) => updateStore(newState),
    insert: (key: string, value: any) => {
      store.insert(key, value);
      notify();
    },
    update: (key: string, value: any) => updateKey(key, value),
    remove: (key: string) => {
      store.remove(key);
      notify();
    },
    clear: () => {
      store.clear();
      notify();
    },
  };
}

export { createStore };
