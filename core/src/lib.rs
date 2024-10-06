use std::sync::{Arc, RwLock};

use ahash::HashMap;
use serde_json::Value;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

pub type TState = HashMap<String, Value>;

#[wasm_bindgen]
pub struct State {
    initial_state: Arc<RwLock<HashMap<String, Value>>>,
    state: Arc<RwLock<HashMap<String, Value>>>,
}

#[wasm_bindgen]
impl State {
    #[wasm_bindgen(constructor)]
    pub fn new(state: JsValue) -> State {
        let initial_state = Arc::new(RwLock::new(
            serde_wasm_bindgen::from_value::<TState>(state.clone()).unwrap(),
        ));

        State {
            initial_state: Arc::clone(&initial_state),
            state: Arc::clone(&initial_state),
        }
    }

    pub fn get(&self) -> JsValue {
        let state = self.state.read().unwrap();
        serde_wasm_bindgen::to_value(&*state).unwrap()
    }

    pub fn get_initial(&self) -> JsValue {
        let initial_state = self.initial_state.read().unwrap();
        serde_wasm_bindgen::to_value(&*initial_state).unwrap()
    }

    pub fn set(&self, state: JsValue) {
        let _ = std::mem::replace(
            &mut *self.state.write().unwrap(),
            serde_wasm_bindgen::from_value::<TState>(state).unwrap(),
        );
    }

    pub fn clear(&self) {
        let _ = std::mem::replace(
            &mut *self.state.write().unwrap(),
            self.initial_state.read().unwrap().clone(),
        );
    }
}
