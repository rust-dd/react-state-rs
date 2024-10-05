/* tslint:disable */
/* eslint-disable */
/**
*/
export class State {
  free(): void;
/**
* @param {any} state
*/
  constructor(state: any);
/**
* @returns {any}
*/
  get(): any;
/**
* @param {string} key
* @returns {any}
*/
  get_key(key: string): any;
/**
* @param {any} state
*/
  set(state: any): void;
/**
* @param {string} key
* @param {any} value
*/
  insert(key: string, value: any): void;
/**
* @param {string} key
* @param {any} value
*/
  update(key: string, value: any): void;
/**
* @param {string} key
*/
  remove(key: string): void;
/**
*/
  clear(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_state_free: (a: number, b: number) => void;
  readonly state_new: (a: number) => number;
  readonly state_get: (a: number) => number;
  readonly state_get_key: (a: number, b: number, c: number) => number;
  readonly state_set: (a: number, b: number) => void;
  readonly state_insert: (a: number, b: number, c: number, d: number) => void;
  readonly state_update: (a: number, b: number, c: number, d: number) => void;
  readonly state_remove: (a: number, b: number, c: number) => void;
  readonly state_clear: (a: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
