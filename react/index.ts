import {useSyncExternalStore} from "react";
import init, {State} from "./wasm/react_state_rs";

await init({});

type StateCreator<T> = {
  getState: () => T;
  getInitialState: () => T;
  setState: (newState: T) => void;
  subscribe: (listener: () => void) => () => void;
};

type UseBoundStore<T> = (<S>(selector: (state: T) => S) => S) & StateCreator<T>;

function identity<T>(arg: T): T {
  return arg;
}

function createStore<T>(initialState: T): StateCreator<T> {
  const state = new State(initialState);
  const listeners = new Set<() => void>();

  return {
    // TODO: need to check the performance of this
    getState: () => Object.fromEntries(state.get() as Map<string, any>) as T,
    // TODO: need to check the performance of this
    getInitialState: () =>
      Object.fromEntries(state.get_initial() as Map<string, any>) as T,
    setState: (newState: T) => {
      state.set(newState);
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

function useStore<T, StateSlice>(
  api: StateCreator<T>,
  selector: (state: T) => StateSlice = identity as any,
) {
  const slice = useSyncExternalStore(api.subscribe, () =>
    selector(api.getState() as T),
  );
  return slice;
}

function create<T>(initialState: T): UseBoundStore<T> {
  const api = createStore(initialState);
  const useBoundStore = <S>(selector: (state: T) => S): S =>
    useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore as UseBoundStore<T>;
}

export {create};
